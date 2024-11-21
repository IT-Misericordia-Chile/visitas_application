import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateLocationModalComponent } from '../../utils/create-location-modal/create-location-modal.component';
import { LocationService } from 'src/app/services/location-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  constructor(private modalCtrl: ModalController,
    private locationService: LocationService
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
      this.message = `Lieu ajouté : ${data.name} !`;
      this.locationService.addLocation(data);
      //ajouter le marqueur à cet endroit
    }
  }

}
