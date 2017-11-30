import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { LocationChooserPage } from '../location-chooser/location-chooser';
import { JourneysPage } from '../journeys/journeys';
import { JourneyPage } from '../journey/journey';
import { Journey } from '../data/journey.model';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Place } from '../data/place.model';
import { GooglePlacesProvider } from '../../providers/google-places/google-places';
import { StorageProvider } from '../../providers/storage/storage';
import { User } from '../data/user.model';
declare var google

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})


export class MainPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  pickupLocation: Place = new Place('Pick-up Location', null);
  dropoffLocation: Place = new Place('Drop-off Location', null)
  numberOfPassengers = 0;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private googlePlaces: GooglePlacesProvider,
              private firebaseProvider: FirebaseProvider,
              private storageProvider: StorageProvider) {
    // this.platform.ready().then(() => {
    //   this.initMap()
    // })

  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });

    // this.map.one(GoogleMapsEvent.MAP_READY)
    //   .then(() => {
    //     console.log('Map is ready!');
    //   });
  }

  onChooseLocation(value: number) {
    if (value === 0) {
      let locationChooserModal = this.modalCtrl.create(LocationChooserPage, {title: 'Pickup location'});
      locationChooserModal.onDidDismiss(data => {
        if (data != null) {
          this.pickupLocation = data.chosenPlace;
          this.googlePlaces.getPlaceLocation(this.pickupLocation.placeId, (error, result) => {
            if (error == null) {
              console.log(result);
            }
          });
        }
      });
      locationChooserModal.present();
    } else {
      let locationChooserModal = this.modalCtrl.create(LocationChooserPage, {title: 'Drop-off location'});
      locationChooserModal.onDidDismiss(data => {
        if (data != null) {
          this.dropoffLocation = data.chosenPlace;
          this.googlePlaces.getPlaceLocation(this.dropoffLocation.placeId, (error, result) => {
            if (error == null) {
              console.log(result);
              let marker = new google.maps.Marker({
                position: result
              });
              marker.setMap(this.map);
              this.map.panTo(result);
            }
          });
        }
      });
      locationChooserModal.present();
    }
  }

  onFindJourney() {
    this.navCtrl.push(JourneysPage);
  }

  onCreateJourney() {
    this.createJourneyModel()
    // this.navCtrl.push(JourneyPage);
  }

  createJourneyModel() {

    if (this.pickupLocation.placeId != null && this.dropoffLocation.placeId != null) {
      console.log('journey not null');


      let journey = new Journey();
      journey.pickupLocation = this.pickupLocation;
      journey.dropoffLocation = this.dropoffLocation;
      journey.numberOfPassengers = this.numberOfPassengers;

      // journey.createrEmail = this.storageProvider.getUserEmail();

      this.firebaseProvider.createJourney(journey)
      let alert = this.alertCtrl.create({
        title: 'Journey',
        subTitle: 'Your journey is created.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Journey',
        subTitle: 'Please specify pick-up and drop-off location.',
        buttons: ['OK']
      });
      alert.present();
    }
    // journey.pickupLocation = this.pickupLocation;
    // journey.dropoffLocation = this.dropoffLocation;
    // journey.numberOfPassengers = this.numberOfPassengers;

    // this.firebaseProvider.createJourney(journey);
  }

}
