import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../models/notification.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
}
