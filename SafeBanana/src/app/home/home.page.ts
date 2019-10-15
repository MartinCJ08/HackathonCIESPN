import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  ngOnInit(): void {
    this.getData();
    this.myEmail = this.env.idUser;
  }

  env = environment;
  dataReport: any[];
  myEmail = '';

  constructor(private eventService: EventService) {}

  getData(){
    this.eventService.getEvent().subscribe(data =>{
      this.dataReport = data;
    });
  }
}
