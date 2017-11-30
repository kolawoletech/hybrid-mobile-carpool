import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Place } from '../../pages/data/place.model';

/*
  Generated class for the GooglePlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google

@Injectable()
export class GooglePlacesProvider {
  autocompleteService = new google.maps.places.AutocompleteService();
  detailsService = new google.maps.Geocoder();

  getPlaces(query: string, callback: any) {
    let places = [];

    this.autocompleteService.getPlacePredictions({
      input: query,
      componentRestrictions: {country: 'th'}
    }, (predictions, status) => {
      if (status === 'OK') {
        console.log(predictions);
        for (let prediction of predictions) {
          let place = new Place(prediction.description, prediction.place_id);
          places.push(place);
        }
        callback(null, {places: places});
      } else {
        callback(new Error('error'));
      }
    });
    return;
  }

  getPlaceLocation(placeId: string, callback: any) {
    console.log(placeId);
    this.detailsService.geocode({
      placeId: placeId
    }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          callback(null, results[0].geometry.location);
        }
      } else {
        callback(new Error('error'));
      }
    })
    return;
  }


}
