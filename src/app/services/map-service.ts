import { Injectable } from '@angular/core';
import { GoogleMap, Marker} from '@capacitor/google-maps';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: GoogleMap = {} as GoogleMap;

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
      language: "es",    
    });
    //this.map.setMapType(MapType.Satellite);
    this.map.enableCurrentLocation(true);
  }
  
  getMap(): Observable<GoogleMap> {
      return of(this.map);
  }

  addMarker(marker: Marker): Promise<string> {
      return this.map.addMarker(marker);
  }
}