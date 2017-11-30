import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { MainPage } from '../main/main';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { User } from '../data/user.model';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private appCtrl: App,
              private googlePlus: GooglePlus,
              private facebook: Facebook,
              private firebaseProvider: FirebaseProvider,
              private storageProvider: StorageProvider) {
  }

  navigateToMain() {
    this.appCtrl.getRootNavs()[0].setRoot(MainPage);
  }

  onGoogleClick() {
    this.googlePlus.login({})
      .then(res => this.createGoogleUserModel(res))
      .catch(err => console.error(err));
  }

  onFacebookClick() {
    this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.as(picture_large)', [])
        .then(res => this.createFacebookUserModel(res)))
      .catch(e => console.log('Error logging into Facebook', e));
  }

  createGoogleUserModel(res: any) {
    console.log(res);

    let usersRef = this.firebaseProvider.getUsers();

    if (usersRef != null) {
      let exist = false;
      let usersSubscription = usersRef.subscribe(streamUsers => {
        streamUsers.map(streamUser => {

          let user = streamUser as User;
          console.log(user);
          if (user.email === res.email) {
            exist = true;
          }
        });
        usersSubscription.unsubscribe();
        let user = new User();
        user.displayName = res.displayName;
        user.firstName = res.givenName;
        user.lastName = res.familyName;
        user.email = res.email;
        user.loginType = 'google'
        if (!exist) {
          this.firebaseProvider.addUser(user);
        }
        this.storageProvider.saveUser(user);
        this.navigateToMain();

      });
    } else {
      // console.log('null')
      // let user = new User();
      // user.displayName = res.displayName;
      // user.firstName = res.givenName;
      // user.lastName = res.familyName;
      // user.email = res.email;
      // user.loginType = 'google'
      //
      // this.firebaseProvider.addUser(user);
      // this.storageProvider.saveUser(user);
    }
  }

  createFacebookUserModel(res: any) {
    console.log(res)
    let usersRef = this.firebaseProvider.getUsers();

    if (usersRef != null) {
      let exist = false;
      let usersSubscription = usersRef.subscribe(streamUsers => {
        streamUsers.map(streamUser => {

          let user = streamUser as User;
          console.log(user);
          if (user.email === res.email) {
            exist = true;
          }
        });
        usersSubscription.unsubscribe();
        let user = new User();
        user.displayName = res.name;
        user.firstName = res.first_name;
        user.lastName = res.last_name;
        user.email = res.email;
        user.profileImageUrl = res.picture_large.data.url;
        user.loginType = 'facebook';
        if (!exist) {
          this.firebaseProvider.addUser(user);
        }
        this.storageProvider.saveUser(user);
        this.navigateToMain();

      });
    } else {
      // console.log('null')
      // let user = new User();
      // user.displayName = res.displayName;
      // user.firstName = res.givenName;
      // user.lastName = res.familyName;
      // user.email = res.email;
      // user.loginType = 'google'
      //
      // this.firebaseProvider.addUser(user);
      // this.storageProvider.saveUser(user);
    }
  }

  saveUser(user: User) {

  }
}
