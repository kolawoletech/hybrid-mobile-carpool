import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationChooserPage } from './location-chooser';

@NgModule({
  declarations: [
    LocationChooserPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationChooserPage),
  ],
})
export class LocationChooserPageModule {}
