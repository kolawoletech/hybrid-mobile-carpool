import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../pages/data/user.model';
import { Journey } from '../../pages/data/journey.model';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public firebaseDatabase: AngularFireDatabase) {}

  addUser(user: User) {
    this.firebaseDatabase.list('users').push(user);
  }

  getUsers() {
    return this.firebaseDatabase.object('users').valueChanges();
  }

  createJourney(journey: Journey) {
    this.firebaseDatabase.list('journeys').push(journey);
  }

  getJourneys() {
    return this.firebaseDatabase.object('journeys').valueChanges();
  }



}
