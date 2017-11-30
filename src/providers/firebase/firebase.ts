import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from '../../pages/data/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Journey } from '../../pages/data/journey.model';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(private afd: AngularFireDatabase, private afs: AngularFirestore) {}

  addUser(user: User) {
    this.afd.list('users').push(user);
  }

  getUsers() {
    return this.afd.list('users').valueChanges();
  }

  createJourney(journey: Journey) {
    this.afd.list('journeys').push(journey);
  }
  //
  getJourneys() {
    return this.afd.list('journeys').valueChanges();
  }
}
