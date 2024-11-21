import { Injectable } from '@angular/core';
import { Marker } from '@capacitor/google-maps';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: Array<Location> = [];

  getLocations(): Array<Location> {
    return [...this.locations];
  }

  addLocation(location: Location): boolean {
    this.locations.push(location);
    console.log("new location added !");
    return (true);
  }
}

export interface Location {
    id?: string,
    name: string,
    description?: string,
    marker: Marker,
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