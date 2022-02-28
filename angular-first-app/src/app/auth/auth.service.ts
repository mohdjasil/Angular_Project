import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
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
        }).pipe( catchError(errorRes => {
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
            }
            return throwError(() => errorMsg);
        }));
    }
}