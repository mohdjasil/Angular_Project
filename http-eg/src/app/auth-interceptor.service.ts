import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next: HttpHandler) {
        console.log("Request on its Way");
        console.log(req.url);
        const modifiedReq = req.clone({
            headers: req.headers.append('Auth','jasil')
        });
        // return next.handle(req); 
        return next.handle(modifiedReq); 
    }
}