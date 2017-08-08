import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UiService } from './ui.service';
import { DropdownFilterService } from "../dropdown-filter/dropdown-filter.service";
import * as turf from 'turf';

declare var mapboxgl: any;

@Injectable()
export class MapService {

    private data;
    private selectedFeature;
    private map;
    private stadtteilData = "./assets/data/Hamburg_Stadtteile.geojson";
    private searchResultMarker;
    private searchResultPopup;


    constructor(private dataService: DataService, private uiService: UiService, private dropDownFilterService: DropdownFilterService ) { }


    initMap(id) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibHVuZGVsaXVzIiwiYSI6ImNpdWljbmV4eTAwM2Uyb21kczN6bndrb2kifQ.AXS9vjUNgfpx8zrAfNT2pw';
        let that = this;

        this.map = new mapboxgl.Map({
            container: id,
            style: 'mapbox://styles/mapbox/streets-v9',
            center : [9.980159, 53.547726],
            zoom: 11
        });

    //    this.map.addControl(new MapboxGeocoder({
    //         accessToken: mapboxgl.accessToken,
    //         placeholder: "Suche",
    //         bbox: [9.725313, 53.39534, 10.325959, 53.738472]
    //     }));

        // TODO: keine Ani bei klick / kein event.    
        // this.map.addControl(new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //         enableHighAccuracy: true
        //     }
        // }));

        // this.map.on('trackuserlocationstart', function () {
        //     console.log("spinner");
        // });

        let nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-right');
        

        this.map.once('style.load', function() {
            if(that.dataService.staticData){
                that.data = that.toGeoJson(that.dataService.staticData);
                that.drawData(that.map, that.data);
                that.filterData();
            } else {
                console.log("should fetch")
                that.dataService.getData().subscribe(res => {
                    that.data = that.toGeoJson(res);
                    that.drawData(that.map, that.data);
                    that.filterData();
                }, err => console.log(err));
            }


            that.dropDownFilterService.getData().subscribe(data => {
                if (data !== null) {
                    if (data["source"] == "static") {
                        that.filterDataStadtteile(data);
                    } else {
                        that.drawSearchResults(data);
                    }
                } else {
                    that.resetMapFeatures();
                }
            }, err => console.log(err));
        });
    }

    drawData(map, data) {
        this.map.addSource('data', {"type" : "geojson", "data" : data});
        this.map.addLayer({
            "id" : "kaufhaus",
            "source" : "data",
            "type" : "symbol",
            "layout": {
                "icon-image": "marker-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top",
                "icon-allow-overlap" : true,
                "text-allow-overlap" : true
            }
        });
        

        this.map.addSource('dataStadtteile', {"type" : "geojson", "data" : this.stadtteilData});
        this.map.addLayer({
            "id" : "stadtteile",
            "source": "dataStadtteile",
            "type" : "fill",
            "paint": {
                "fill-color": "#00ffff"
            },
            "layout": {
                'visibility': 'none'
            }
        });

        this.addMarker();
    }

    addMarker() {
        let that = this;

        let content = '<div class="searchResultMarker"></div><div class="searchResultMarker-pulse"></div>';     // use innerHTML to preserve transform:translate(x,y) from mapbox to position marker

        // add popup to show on hover over feature
        let kaufhausPopup = new mapboxgl.Popup({ offset: [-5, -15], closeButton: true, closeOnClick: true });
        kaufhausPopup.setDOMContent(document.getElementById('wbc-popup'));

        // markers can't be filtered like features, so can't be hidden as easily
        // this.data.features.forEach(function (marker) {

        //     let markerEl_KH = document.createElement('div');
        //     markerEl_KH.innerHTML = content;

        //     let newMarker = new mapboxgl.Marker(markerEl_KH);
        //     newMarker.setLngLat(marker.geometry.coordinates).addTo(that.map);

        //     newMarker.setPopup(kaufhausPopup);

        //     markerEl_KH.addEventListener('mouseenter', function () {
        //         if (!kaufhausPopup.isOpen()) {
        //             newMarker.togglePopup();
        //         }
        //     });
        // });

        this.map.on('mousemove', function (e) {
            var features = that.map.queryRenderedFeatures(e.point, { layers: ['kaufhaus'] });
            that.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            if (features.length > 0) {
                that.uiService.popupFeature = features[0];
                kaufhausPopup
                    .setLngLat(features[0].geometry.coordinates)
                    .addTo(that.map);
            }
        });


        // prepare marker for searchresult
        let searchResultMarkerEl = document.createElement('div');
        searchResultMarkerEl.innerHTML = content;

        let searchResultMarker = new mapboxgl.Marker(searchResultMarkerEl);
        let searchResultPopup = new mapboxgl.Popup({ offset: [-5, -15], closeButton: false, closeOnClick: false });
        searchResultMarker.setLngLat({ lng: 0, lat: 0 }).addTo(that.map);
        searchResultMarker.setPopup(searchResultPopup);

        that.searchResultMarker = searchResultMarker;
        that.searchResultPopup = searchResultPopup;

        searchResultMarkerEl.addEventListener('mouseenter', function () {
            if (!that.searchResultPopup.isOpen()) {
                that.searchResultMarker.togglePopup();
            }
        });
        searchResultMarkerEl.addEventListener('mouseleave', function () {
            if (that.searchResultPopup.isOpen()) {
                that.searchResultMarker.togglePopup();
            }
        });




    }

    toGeoJson(data){
        let features = [];
        data.forEach(function(item){
            let feature = {
                "type" : "Feature",
                "properties": {
                    "title" : item.title.$t,
                    "address" : item.gsx$adresse.$t,    
                    "tel" : item.gsx$telefon.$t,
                    "img" : item.gsx$picurl.$t,
                    "descde" : item.gsx$beschreibungde.$t,
                    "opening" : item.gsx$oeffnungszeiten.$t,

                    //KATEGORIE STUFF
                    "freizeit" : item.gsx$freizeit.$t,
                    "fahrrad" : item.gsx$fahrradfahrradbedarf.$t,
                    "bücher" : item.gsx$bücher.$t,
                    "spielzeug" : item.gsx$spielzeug.$t,
                    "cds"     : item.gsx$cds.$t,
                    "camping"     : item.gsx$camping.$t,
                    "schule"     : item.gsx$schule.$t,
                    "musik"     : item.gsx$musik.$t,
                    // END KATEGORIE STUFF

                    "props": item,
                    "lat" : parseFloat(item.gsx$lat.$t),
                    "lng" : parseFloat(item.gsx$lng.$t)
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

    toggleSub(sub) {
        let filter = [];
        sub.active = !sub.active;
        this.dataService.activeCat.subs.forEach(function(subItem){
            if (subItem.active){
                filter.push(['==', subItem.name.toLowerCase(), 'TRUE']);
            }
        });

        if (filter.length > 0){
            this.map.setFilter('kaufhaus', ['any'].concat(filter));
        } else {
            filter.push(['==', this.dataService.activeCat.name.toLowerCase(), 'TRUE']);
            this.map.setFilter('kaufhaus', ['any'].concat(filter));
        }

    }

    filterData() {
        let filter = [];
        if (this.dataService.activeCat) {
            filter.push(['==', this.dataService.activeCat.name.toLowerCase(), 'TRUE']);
            this.map.setFilter('kaufhaus', ['any'].concat(filter));
        }

    }

    filterDataStadtteile (selectedFeature) {
        this.map.setFilter('stadtteile', ["==", "place_name", selectedFeature.place_name]);
        this.map.setLayoutProperty('stadtteile', 'visibility', 'visible');
        this.zoomToBoundingBox(selectedFeature.bounds);
    }

    resetMapFeatures () {
        this.map.setLayoutProperty('stadtteile', 'visibility', 'none');
        if (this.searchResultMarker) {
            this.searchResultMarker.remove();
        }
    }

    drawSearchResults(feature) {
        this.searchResultMarker.setLngLat({ lng: feature.center[0], lat: feature.center[1] }).addTo(this.map);
        this.searchResultMarker.setPopup(this.searchResultPopup);
        this.searchResultPopup.setText(feature.place_name);
        this.zoomToPoint([feature.center[0], feature.center[1]]);
    }

    markerClicked(marker) {
        console.log(marker);
        
    }

    zoomToBoundingBox(bounds) {
        this.map.fitBounds(bounds, {padding: 80});
    }

    zoomToPoint(point) {
        // this.map.flyTo({ center: point, zoom: 15 });
        var bounds = this.bboxFromPointAndKaufhaus(point);
        this.zoomToBoundingBox(bounds);
    }

    bboxFromPointAndKaufhaus(point) {
        var that = this;
        var nearestKaufhaus = turf.nearest(point, that.data);
        let bounds = new mapboxgl.LngLatBounds();
        bounds.extend(nearestKaufhaus.geometry.coordinates);
        bounds.extend(point);
        return bounds;
    }
}