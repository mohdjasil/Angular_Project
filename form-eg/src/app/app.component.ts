import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUsernames = ['chris','anna'];

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [
            Validators.required,
            this.forbiddenNames.bind(this)
          ]),
          'email': new FormControl(null, [
            Validators.required,
            Validators.email
          ],this.forbiddenEmails)
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset({gender:'female'});
  }

  onAddHobby(){
    const control = new  FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  getControls() { 
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'NameIsForbidden' : true};
    }
    return null; //you can also omit return stmt
  }

  //Asynchronous Validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          res({'EmailIsForbidden': true});
        } else {
          res(null);
        }
      }, 1500); 
    });
    return promise;
  }
}
