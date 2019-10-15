import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  inputValue = '';
  inputLast = '';
  inputEmail = '';
  inputPass =  '';
  inputPass2 = '';
  inputPhone = '';
  inputUser = '';

  user: any[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      console.log(data);
    });
  }

  register(){
    let input = this.inputValue;
    let last2 = this.inputLast;
    let email2 = this.inputEmail;
    let pass2 = this.inputPass;
    let phone2 = this.inputPhone;
    let user2 = this.inputUser;
/*
    this.user =User[   
      name: input,
      lastname: last2,
      email: email2,
      phone: phone2,
      user: user2,
      password:pass2
    ];*/

    let myUser: User = {
      name: input,
      lastname: last2,
      email: email2,
      phone: phone2,
      user: user2,
      password:pass2,
      moroso: "no"
    };

    
    
    console.log("Agregando "+this.userService.addUser(myUser));

    this.userService.getUser().subscribe(data => {
      console.log(data);
    });
  }

}
