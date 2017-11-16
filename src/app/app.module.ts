import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Firebase } from '@ionic-native/firebase';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import { HistoryPage } from '../pages/history/history';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationChooserPage } from '../pages/location-chooser/location-chooser';
import { JourneysPage } from '../pages/journeys/journeys';
import { JourneyPage } from '../pages/journey/journey';

const firebaseConfig = {
  apiKey: "AIzaSyAHYNC7M_eQJwY0XcNM6JLOQ7Z7ko9fX1A",
  authDomain: "carpooling-e8c3c.firebaseio.com",
  databaseURL: "https://carpooling-e8c3c.firebaseio.com",
  projectId: "carpooling-e8c3c",
  storageBucket: "carpooling-e8c3c.appspot.com",
  messagingSenderId: "yourvalues"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainPage,
    LocationChooserPage,
    JourneysPage,
    JourneyPage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainPage,
    LocationChooserPage,
    JourneysPage,
    JourneyPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    GoogleMaps,
    Geolocation,
    Firebase,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
