import { Injectable } from '@angular/core';
import { Marker } from '@capacitor/google-maps';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: Array<Location> = [
    {
      id: "0",
      name: "TestLocation",
      description: "Ouais",
      marker: { coordinate: { lat: 0, lng: 0 }},
      markerId: "-1",
      inhabitants: "",
      locationFullName: "Ébano 6300, 8590100 Santiago, Huechuraba, Región Metropolitana",
      dateLastVisit: new Date()
    }
  ];

  getLocations(): Observable<Array<Location>> {
    return of([...this.locations]);
  }

  addLocation(location: Location): boolean {
    this.locations.push(location);
    console.log("new location added !", this.locations);
    return (true);
  }
}

export interface Location {
    id?: string,
    name: string,
    description?: string,
    marker: Marker,
    markerId?: string,
    inhabitants?: string;
    inhabitantsId?: Array<Inhabitant>,
    locationFullName: string,
    dateLastVisit?: Date
  }
  
  export interface Inhabitant {
    id: string, 
    firstName: string,
    lastName?: string,
    married?: boolean,
    age?: number,
    birthday?: Date,
    grandmotherID?: string,
    grandfatherID?: string
    motherID?: string,
    fatherID?: string,
    childID?: Array<string>
  }