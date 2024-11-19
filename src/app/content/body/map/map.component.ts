import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapType, Marker } from '@capacitor/google-maps';
import { MenuController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
const apiKey = environment.apiKey;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent  implements OnInit {

  map: GoogleMap = {} as GoogleMap;

  constructor(private menuController: MenuController, private modalController: ModalController) {
  }

  ngOnInit() {
    this.initMap();
  }

  async initMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map') as HTMLElement,
      apiKey: apiKey,
      config: {
        disableDefaultUI: true,
        center: {
          lat: -33.361146,
          lng: -70.631471,
        },
        zoom: 17,
      },
      language: "es"
    });
    this.map.setMapType(MapType.Satellite);
    this.map.enableCurrentLocation(true);
  }

  addLocations() {
    this.map.setOnMapClickListener( res => {
      console.log("Ajout d'une adresse");
      //ici faire une modale de modification, si un abandon est fait 
      //ou qu'une erreur est produite pendant l'enregistrement ne pas créer le marker
      const marker: Marker = {
        title: "titre d'adresse",
        coordinate: {
          lat: res.latitude,
          lng: res.longitude
        }
      }
      this.map.addMarker(marker);
    })
  }
  
  changeLocationInfo() {
    this.map.setOnInfoWindowClickListener( info => {
      console.log("InfoWindowOnClickListener => ", info);
    })

    this.map.setOnMarkerClickListener( marker => {
      console.log("modification voulue de ce marker => ", marker);
      //aller chercher dans le back si le marker existe chez nous
      //si il existe lancer une requète de modification et créer une modale de modification
    })
  }

  async addLocationInfo() {
    const modal = await this.modalController.create({
      component: null, //createLocationComponent,
      componentProps: {}, //info de la localitée à récuperer dans le back,
      initialBreakpoint: 0.25,
      breakpoints: [0, 0.25]
    });
    await modal.present();
  } 
}
