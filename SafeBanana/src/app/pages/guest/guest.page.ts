import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  ngOnInit(): void {
    this.myEmail = this.env.idUser;
    this.getData();
  }

  env = environment;

  myEmail = '';
  dataReport : any[]
  constructor(private guestService: GuestService) {}

  getData(){
    this.guestService.getGuest().subscribe(data =>{
      this.dataReport = data;
      console.log(data);
    });
  }
}
