import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  inputEmail = '';
  inputPass = '';

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

  register() {

    let inputEmail2 = this.inputEmail;
    let inputPass2 = this.inputPass;
    console.log(inputEmail2);
    console.log(inputPass2);
  }

}
