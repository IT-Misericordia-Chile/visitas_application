import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from 'src/app/services/location-service';
import { NativeGeocoder } from '@capgo/nativegeocoder';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;

@Component({
  selector: 'app-create-location-modal',
  templateUrl: './create-location-modal.component.html',
  styleUrls: ['./create-location-modal.component.scss'],
})

export class CreateLocationModalComponent{
  canConfirm: boolean = false;
  location: Location = {
    name: "",
    inhabitants: "",
    locationFullName: "",
    description: "",
    dateLastVisit: new Date(),
    marker: { 
        coordinate: {
            lat: 0,
            lng: 0,
        }
    },
};

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.location.marker.title = this.location.name;
    this.location.marker.snippet = this.location.description;
    //this.location.marker.draggable = true;
    return this.modalCtrl.dismiss(this.location, 'confirm');
  }

  async updateLocationInfo($event: any, type: string) {
    if (type == 'location')
      this.location.name = $event.target.value;
    if (type == 'inhabitants')
      this.location.inhabitants = $event.target.value;
    if (type == 'adress') {
      this.location.locationFullName = $event.target.value;
      const result = await NativeGeocoder.forwardGeocode({
        addressString: this.location.locationFullName,
        defaultLocale: "es",
        apiKey: apiKey
      });
      if (result != null && result.addresses != null) {
        this.location.marker.coordinate = {
        lat: result.addresses[0].latitude, 
        lng: result.addresses[0].longitude}
      }
    }
    if (type == 'desc')
      this.location.description = $event.target.value;
    if (type == 'date')
      this.location.dateLastVisit = $event.target.value;

    if (this.location.name.length > 0 && this.location.locationFullName.length > 0)
      this.canConfirm = true;
    else 
      this.canConfirm = false;
  }
}
