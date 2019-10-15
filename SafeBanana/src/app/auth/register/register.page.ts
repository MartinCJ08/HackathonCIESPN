import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  env = environment;

  inputEmail = '';
  inputPass = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {

    let inputEmail2 = this.inputEmail;
    let inputPass2 = this.inputPass;

    if (inputEmail2 == "miguel@gmail.com" || inputEmail2 == "martin@gmail.com" || inputEmail2 == "jona@gmail.com" || inputEmail2 == "leo@gmail.com" || inputEmail2 == "david@gmail.com") {
      if (inputPass2 == "123456") {
        this.env.isLoggedIn = true;
        this.env.idUser = inputEmail2;
        this.router.navigate(['/home']);
      }else{
        alert("Error");
      }
    }else{
      alert("Error");
    }
  }

}
