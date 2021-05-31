import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';


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
    private authServ : AuthenticationService) { }

  onSubmit(){
    var userData = this.loginForm.value
    this.authServ.userLogin(userData).subscribe(
      (res: any) => {
        this.router.navigate(['dashboard'])
      },
      (err) => {
        console.log(err)
        this.isError = true
      }
    )
  }
}
