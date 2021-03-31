import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  isError = false

  loginForm = this.formBuilder.group({
    login : "",
    password: ""
  })

  constructor(private formBuilder : FormBuilder, private router : Router,
    private loginService : LoginService) { }
 
  onSubmit(){
    var userData = this.loginForm.value
    this.loginService.userLogin(userData).subscribe(
      (res) => {
        localStorage.setItem('token', res['access_token']);
        this.router.navigate(['dashboard'])
      },
      (err) => {
        console.log(err)
        this.isError = true
      }
    )
  }
}
