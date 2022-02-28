import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})

export class authComponent{
    constructor(private authService: AuthService) {}

    isLogin = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLogin = !this.isLogin;
    }

    onSubmitForm(form: NgForm) {
        if(!form.valid) {
            return;
        }
        
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading  = true;

        if(this.isLogin) {
            //..
        } else {
            this.authService.signUp(email, password).subscribe(
                {
                    next: (response) => { console.log(response); this.isLoading = false; },
                    error: (errorRes) => {
                        console.log(errorRes);
                        this.error = errorRes;
                        this.isLoading = false;
                    }
                }
            );
        }

        form.reset();
    }
}