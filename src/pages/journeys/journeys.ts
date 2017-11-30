import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the JourneysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journeys',
  templateUrl: 'journeys.html',
})
export class JourneysPage {

  journeys = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseProvider: FirebaseProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneysPage');
    this.loadJourneys();
  }

  loadJourneys() {
    let journeysRef = this.firebaseProvider.getJourneys();
    let journeysSubscription = journeysRef.subscribe(streamJourneys => {
      streamJourneys.map(streamJourney => {
        console.log(streamJourney);
        this.journeys.push(streamJourney);
      })
      journeysSubscription.unsubscribe();
    });
  }

  onChooseJourney() {
    let alert = this.alertCtrl.create({
      title: 'Confirm journey',
      subTitle: 'Do you want to join this journey?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
