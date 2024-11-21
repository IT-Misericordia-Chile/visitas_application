import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { MenuController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';

import { Location, LocationService } from 'src/app/services/location-service';
import { MapService } from 'src/app/services/map-service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent  implements OnInit, OnDestroy {
  private _mapSub$ = new Subject<void>();
  private _locationsSub$ = new Subject<void>();

  map: GoogleMap = {} as GoogleMap;
  locations: Array<Location> = [];

  constructor(private menuController: MenuController, 
    private modalController: ModalController,
    private locationService: LocationService,
    private mapService: MapService) {
  }

  ngOnInit() {
    this.locationService.getLocations()
      .pipe(takeUntil(this._locationsSub$))
      .subscribe(data => {
        console.log("refresh1", data);
        this.locations = data;
      });
    this.mapService.initMap()
      .then(sub => this.mapService.getMap()
          .pipe(takeUntil(this._mapSub$))
          .subscribe(data => {
            this.map = data
            console.log("refresh2");
          }))
          .then(sub => this.map.setOnMarkerClickListener(marker => 
            {
              console.log("MarkerOnClickListener", marker);
              this.showLocations(marker.markerId);
            })
          );
  }

  showLocations(markerId: string) {
    console.log("Hello");
    console.log("Locations : ", this.locations);
    const exist = this.locations.find(location => location.markerId === markerId);
    if (exist) {
      console.log(exist);
    }
  }

  ngOnDestroy() {
    this._mapSub$.next();
    this._locationsSub$.next();
  }

  /*addLocations() {
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
  }*/
}

