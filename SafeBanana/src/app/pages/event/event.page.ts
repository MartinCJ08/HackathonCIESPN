import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.interfaces';
import { EventService } from '../../services/event.service';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  env = environment;

  inputType = '';
  inputIniDate = '';
  inputFinDate = '';
  inputRange = '';
  inputDesc = '';

  event: any[];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    
  }

  register() {
    let type2 = this.inputType;
    let iniDate2 = this.inputIniDate;
    let finDate2 = this.inputFinDate;
    let range2 = this.inputRange;
    let desc2 = this.inputDesc;

    console.log(this.env.idUser);

    let myEvent: Event = {
      idUsu: this.env.idUser,
      type: type2,
      desc: desc2,
      iniDate: iniDate2,
      finDate: finDate2,
      range: range2,
    };

    console.log(myEvent);
    this.eventService.addEvent(myEvent);
    this.router.navigate(['/home']);

  }
}
