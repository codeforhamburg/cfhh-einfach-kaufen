import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MapBoxGeocoderService {
  private http: Http;
  private accessToken = 'pk.eyJ1Ijoid2VidWlsZGNpdHkiLCJhIjoiY2o2NjRzN3hjMjR1ZzMybm93bDVxNzFkYSJ9.Cn82QIwnCXpfEU7TcGlEkQ';
  private language = "de";
  private boundingBox = "9.725313%2C53.39534%2C10.325959%2C53.738472"

  constructor(http: Http) {
    this.http = http;
  }

  geocode(address: string) {
    return this.http
      .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?bbox=" + this.boundingBox + "&language=" + this.language + "&access_token=" + this.accessToken)
      .map(res => res.json())
  }

}