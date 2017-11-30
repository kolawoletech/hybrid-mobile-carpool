import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { User } from '../../pages/data/user.model';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(private nativeStorage: NativeStorage) {

  }

  saveUser(user: User) {
    this.nativeStorage.setItem('user', user)
      .then(
        () => {
          console.log('success');
        },
        error => {
          console.error('error');
        });
  }

  getUserEmail() {
    this.nativeStorage.getItem('user').then(
      data => {
        console.log('data', data)
        return data.email;
      },
      error => console.error(error)
    );
  }
}
