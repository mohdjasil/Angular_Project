import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

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

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string ) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLqGHgngj-PgnfkKXU-leWgGO4EAwzZZs', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe( catchError( this.handleError ));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLqGHgngj-PgnfkKXU-leWgGO4EAwzZZs',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe( catchError( this.handleError ));
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
}