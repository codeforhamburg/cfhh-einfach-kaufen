import { Injectable } from '@angular/core';
import { DataService } from './data.service';

declare var mapboxgl: any;
// declare var MapboxGeocoder: any;

@Injectable()
export class MapService {

    private data;


    constructor(private dataService: DataService) { }


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

        // this.drawData(this.dataService.data);
        map.once('style.load', function() {
            if(that.dataService.staticData){
                that.data = that.toGeoJson(that.dataService.staticData);
                that.drawData(map, that.data);
            } else {
                console.log("should fetch")
                that.dataService.getData().subscribe(res => {
                    that.data = that.toGeoJson(res);
                    that.drawData(map, that.data);
                }, err => console.log(err));
            }

            console.log(that.data);
        });
    }

    drawData(map, data){
        map.addSource('data', {"type" : "geojson", "data" : data});
        map.addLayer({
            "id" : "kaufhaus",
            "source" : "data",
            "type" : "symbol",
            "layout": {
                "icon-image": "monument-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top",
                "icon-allow-overlap" : true,
                "text-allow-overlap" : true
            }
        })
    }

    toGeoJson(data){
        let features = [];
        data.forEach(function(item){
            let feature = {
                "type" : "Feature",
                "properties": {
                    "title" : item.title.$t,
                    "props" : item
                },
                // "id"       : item.pk,
                "geometry" : { "type" : "Point", "coordinates" : [parseFloat(item.gsx$lng.$t), parseFloat(item.gsx$lat.$t)] }
            }

            features.push(feature);
        });

        let geojson = {
          "type" : "FeatureCollection",
          "features": features
        }
        return geojson;
    }

}
