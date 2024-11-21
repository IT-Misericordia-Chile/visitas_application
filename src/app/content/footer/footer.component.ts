import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateLocationModalComponent } from '../../utils/create-location-modal/create-location-modal.component';
import { LocationService } from 'src/app/services/location-service';
import { MapService } from 'src/app/services/map-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private modalCtrl: ModalController,
    private locationService: LocationService,
    private mapService: MapService
  ) { }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateLocationModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data);
    console.log(role);

    if (role === 'confirm') {
      //transformer ce message en popup
      //this.message = `Lieu ajouté : ${data.name} !`;
      if (this.locationService.addLocation(data)) {
        await this.mapService.addMarker(data.marker).then(id => {
          data.id = id;
        });
      }
    }
  }

}
