import { Injectable } from '@angular/core';

declare var mapboxgl: any;
// declare var MapboxGeocoder: any;

@Injectable()
export class MapService {


    constructor() { }


    initMap(id) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibHVuZGVsaXVzIiwiYSI6ImNpdWljbmV4eTAwM2Uyb21kczN6bndrb2kifQ.AXS9vjUNgfpx8zrAfNT2pw';
        let that = this;

        let map = new mapboxgl.Map({
            container: id,
            style: 'mapbox://styles/mapbox/streets-v9',
            center : [9.980159, 53.547726],
            zoom: 11
        });

       // map.addControl(new MapboxGeocoder({
       //      accessToken: mapboxgl.accessToken,
       //      placeholder: "Suche"
       //  }));

        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }
        }));

        // debugger
        // window.map = this.map;
        let nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-right');
    }

}
