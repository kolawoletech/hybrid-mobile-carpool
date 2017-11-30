import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GooglePlacesProvider } from '../../providers/google-places/google-places';
import { Place } from '../data/place.model';

/**
 * Generated class for the LocationChooserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-chooser',
  templateUrl: 'location-chooser.html',
})
export class LocationChooserPage {
  pageTitle: string;
  input: string;
  places = [];

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private googlePlaces: GooglePlacesProvider) {
  }

  ionViewDidLoad() {
    this.pageTitle = this.navParams.get('title');
    console.log(this.pageTitle);
  }

  updateSearch() {
    this.places = [];

    if (this.input.length != 0) {
      console.log('getPlaces');
      this.googlePlaces.getPlaces(this.input, (error, result) => {
        if (error == null) {
          this.places = result.places;
        }
      });
    }
  }

  onChoosePlace(place: Place) {
    this.viewCtrl.dismiss({chosenPlace: place});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
