import { Component, OnInit } from '@angular/core';
import { GoogleMap, Marker} from '@capacitor/google-maps';
import { MenuController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';

import { Location, LocationService } from 'src/app/services/location-service';
import { MapService } from 'src/app/services/map-service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent  implements OnInit {
  private _isDead$ = new Subject();

  map: GoogleMap = {} as GoogleMap;
  locations: Array<Location> = [];

  constructor(private menuController: MenuController, 
    private modalController: ModalController,
    private locationService: LocationService,
    private mapService: MapService) {
  }

  ngOnInit() {
    this.locations = this.locationService.getLocations();
    this.mapService.initMap()
      .then(map => 
        this.mapService.getMap()
          .pipe(takeUntil(this._isDead$))
          .subscribe(data => this.map = data));
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
}

