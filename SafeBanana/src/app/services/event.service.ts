import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventCollection: AngularFirestoreCollection<Event>;
  private event: Observable<Event[]>;
  constructor(db: AngularFirestore) {
    this.eventCollection = db.collection<Event>('event');
    this.event = this.eventCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      }
    ))
  }

  getEvent() {
    return this.event;
  }

  getEventID(id: string) {
    return this.eventCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event: Event, id: string) {
    return this.eventCollection.doc(id).update(event);
  }

  addEvent(event: Event){
    return this.eventCollection.add(event);
  }

  removeEvent(id: string){
    return this.eventCollection.doc(id).delete();
  }
}