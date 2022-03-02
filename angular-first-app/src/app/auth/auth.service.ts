import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private _tokenExpirationTimer: any;


    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string ) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLqGHgngj-PgnfkKXU-leWgGO4EAwzZZs', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe( catchError( this.handleError ), tap(resData => {
           this.handleAuthenticaton(
               resData.email,
               resData.localId,
               resData.idToken,
               +resData.expiresIn
           );
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLqGHgngj-PgnfkKXU-leWgGO4EAwzZZs',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe( catchError( this.handleError ), tap( resData => {
            this.handleAuthenticaton(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            );
        }));
    }

    private handleAuthenticaton(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'AN Unknown Error Occured!';
        if(!errorRes.error || !errorRes.error.error) {
                return throwError(() => errorMsg);
        }

        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'Email Already Exists';
                break;
                
            case 'INVALID_EMAIL':
                errorMsg = 'Invalid Email';
                break;
            
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'Email does not Exist';
                break;

            case 'INVALID_PASSWORD':
                errorMsg = 'Password does not match';
                break;
        }
        return throwError(() => errorMsg);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
            this._tokenExpirationTimer = null;
        }
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            // console.log(expirationDuration);
            this.autoLogout(expirationDuration) ;
        }
    }

    autoLogout(expirationDuration: number) {
        this._tokenExpirationTimer = setTimeout( () => {
            this.logout();
        } , expirationDuration);
    }

    
}