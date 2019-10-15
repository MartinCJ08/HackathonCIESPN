import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guest } from '../models/guest.interface';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private guestCollection: AngularFirestoreCollection<Guest>;
  private guest: Observable<Guest[]>;
  constructor(db: AngularFirestore) { 
    this.guestCollection = db.collection<Guest>('guest');
    this.guest = this.guestCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      }
    ))
  }

  getGuest() {
    return this.guest;
  }

  getGuestID(id: string) {
    return this.guestCollection.doc<Guest>(id).valueChanges();
  }

  updateGuest(guest: Guest, id: string) {
    return this.guestCollection.doc(id).update(guest);
  }

  addGuest(guest: Guest){
    return this.guestCollection.add(guest);
  }

  removeGuest(id: string){
    return this.guestCollection.doc(id).delete();
  }
}
