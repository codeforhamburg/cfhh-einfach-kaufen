import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UiService } from './ui.service';
import { DropdownFilterService } from "../dropdown-filter/dropdown-filter.service";
import * as turf from 'turf';

declare var mapboxgl: any;
declare var MapboxGeocoder: any;
// declare var turf: any;

@Injectable()
export class MapService {

    private data;
    private selectedFeature;
    private map;
    private stadtteilData = "./assets/data/Hamburg_Stadtteile.geojson";
    private searchResultMarker = null;
    private searchResultPopup;
    private kaufhausPopup;


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

       this.map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: "Suche",
            bbox: [9.725313, 53.39534, 10.325959, 53.738472]
        }));

        // this.map.addControl(new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //         enableHighAccuracy: true
        //     }
        // }));

        // debugger
        // window.map = this.map;
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

            var markerEl = document.createElement('div');
            markerEl.innerHTML = '<div class="searchResultMarker"></div>' +       // use innerHTML to preserve transform:translate(x,y) from mapbox to position marker
                            '<div class="searchResultMarker-pulse"></div>';
            
            that.searchResultMarker = new mapboxgl.Marker(markerEl);
            that.searchResultPopup = new mapboxgl.Popup({ offset: [-5, -15], closeButton: false, closeOnClick: false});

            markerEl.addEventListener('mouseenter', function () {
                if (!that.searchResultPopup.isOpen()) {
                    that.searchResultMarker.togglePopup();
                }
            });
            markerEl.addEventListener('mouseleave', function () {
                if (that.searchResultPopup.isOpen()) {
                    that.searchResultMarker.togglePopup();
                }
            });

            let popupEle = document.getElementById('wbc-popup');
            that.kaufhausPopup = new mapboxgl.Popup({ offset: [-5, -15], closeButton: true, closeOnClick: true });
            that.kaufhausPopup.setDOMContent(popupEle);

        });
    }

    drawData(map, data) {
        this.map.addSource('data', {"type" : "geojson", "data" : data});
        this.map.addLayer({
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



        this.addMouseHandler(this.map);
    }

    addMouseHandler(map){

        let that = this;
        //DISPLAY POPUP ON HOVER
        var popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true
        });

        // map.on('mouseenter', 'kaufhaus', function(e) {
        //     // Change the cursor style as a UI indicator.
        //     map.getCanvas().style.cursor = 'pointer';

        //     // Populate the popup and set its coordinates
        //     // based on the feature found.
        //     popup.setLngLat(e.features[0].geometry.coordinates)
        //         .setHTML(e.features[0].properties.title +  '<br>' + e.features[0].properties.props.gsx$adresse)
        //         .addTo(map);
        // });

        // map.on('mouseleave', 'kaufhaus', function() {
        //     map.getCanvas().style.cursor = '';
        //     popup.remove();
        // });

        this.map.on('mousemove', function(e) {
            var features = that.map.queryRenderedFeatures(e.point, { layers: ['kaufhaus'] });
            that.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            if (features.length > 0){
                that.uiService.popupFeature = features[0];
                that.kaufhausPopup.setLngLat(features[0].geometry.coordinates);
                // popup.setLngLat(features[0].geometry.coordinates)
                //     // .setHTML(features[0].properties.title +  '<br>' + features[0].properties.address +  '<br> T - ' + features[0].properties.tel)
                //     .setDOMContent(document.getElementById('wbc-popup'))
                //     .addTo(that.map);
            } else {
                // map.getCanvas().style.cursor = '';
                // that.uiService.popupFeature = null;
                // popup.remove();
                // if (popup.isOpen()) {
                //     that.searchResultMarker.togglePopup();
                // }
            }
        });
        this.addMarker();

 
    }

    addMarker() {
        // https://stackoverflow.com/questions/17662551/how-to-use-angular-directives-ng-click-and-ng-class-inside-leaflet-marker-popup
        let that = this;
        let content = '<div class="searchResultMarker"></div><div class="searchResultMarker-pulse"></div>';

        this.data.features.forEach(function (marker) {

            var markerEl = document.createElement('div');
            markerEl.innerHTML = content;
            
            var newMarker = new mapboxgl.Marker(markerEl);
            newMarker.setLngLat(marker.geometry.coordinates).addTo(that.map);
            
            newMarker.setPopup(that.kaufhausPopup);

            markerEl.addEventListener('mouseenter', function () {
                console.log(newMarker)
                if (!that.kaufhausPopup.isOpen()) {
                    newMarker.togglePopup();
                }
            });
            // markerEl.addEventListener('mouseleave', function () {
            //     if (that.kaufhausPopup.isOpen()) {
            //         newMarker.togglePopup();
            //     }
            // });
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