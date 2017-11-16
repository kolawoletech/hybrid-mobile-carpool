import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { LocationChooserPage } from '../location-chooser/location-chooser';
import { JourneysPage } from '../journeys/journeys';
import { JourneyPage } from '../journey/journey';
import { Journey } from '../data/journey.model';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  pickupLocation: string;
  dropoffLocation: string;
  numberOfPassengers: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private googleMaps: GoogleMaps,
              private firebaseProvider: FirebaseProvider) {
    // this.platform.ready().then(() => {
    //   this.loadMap()
    // })

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
      });
  }

  onChooseLocation(value: number) {
    if (value === 0) {
      let locationChooserModal = this.modalCtrl.create(LocationChooserPage,{title: "Pickup location"});
      locationChooserModal.present();
    } else {
      let locationChooserModal = this.modalCtrl.create(LocationChooserPage, {title: "Drop-off location"});
      locationChooserModal.present();
    }
  }

  onFindJourney() {
    this.navCtrl.push(JourneysPage);
  }

  onCreateJourney() {
    this.createJourneyModel()
    this.navCtrl.push(JourneyPage);
  }

  createJourneyModel() {
    console.log(this.pickupLocation);
    console.log(this.dropoffLocation);
    console.log(this.numberOfPassengers);

    let journey = new Journey();
    journey.pickupLocation = this.pickupLocation;
    journey.dropoffLocation = this.dropoffLocation;
    journey.numberOfPassengers = this.numberOfPassengers;

    this.firebaseProvider.createJourney(journey);

  }

}
