import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UiService } from './ui.service';

declare var mapboxgl: any;
// declare var MapboxGeocoder: any;

@Injectable()
export class MapService {

    private data;
    private selectedFeature;


    constructor(private dataService: DataService, private uiService: UiService) { }


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
        });
        this.addMouseHandler(map);
    }

    addMouseHandler(map){

        let that = this;
        //DISPLAY POPUP ON HOVER
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
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

        map.on('mousemove', function(e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['kaufhaus'] });
            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            if (features.length > 0){
                popup.setLngLat(features[0].geometry.coordinates)
                    .setHTML(features[0].properties.title +  '<br>' + features[0].properties.address +  '<br> T - ' + features[0].properties.tel)
                    .addTo(map);
            } else {
                // map.getCanvas().style.cursor = '';
                popup.remove();
            }
        });

        map.on('click', function(e){
            var features = map.queryRenderedFeatures(e.point, { layers: ['kaufhaus'] });
            if (features.length > 0){
                that.selectedFeature = features[0];
                that.uiService.showSelectedFeature = true;
            }
        });

                  // Mousehandlers for highlighting and openening popups
            // that.map.on('mousemove', function(e) {
            //     var allFeatures = that.map.queryRenderedFeatures(e.point);
            //     var features = that.map.queryRenderedFeatures(e.point, { layers: ['projectLayer'] });
            //     that.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
                
            //     var feature = features[0];
            //     if (features.length > 0){
                    
            //         that.map.setFilter('project-layer-hover', ["==", "id", feature.properties.id]);
            //         that.dataService.hoverProject(feature.properties.id);
                    
            //         let lngLat = JSON.parse(feature.properties.location);
            //         let wbcPopup = window.document.getElementById('wbc-popup-content');
                    
            //         popup
            //             .setLngLat(lngLat)
            //             .setDOMContent(wbcPopup)
            //             // .setHTML(that.makePopup(feature.properties))
            //             .addTo(that.map);
            //         wbcPopup.style.display = 'block';

            //         let pop = window.document.getElementsByClassName('mapboxgl-popup')[0] as HTMLElement;
            //         if(pop)
            //             pop.style.display = 'flex';

            //     } else {

            //         let pop = window.document.getElementsByClassName('mapboxgl-popup')[0] as HTMLElement;
                    
            //         if(pop)
            //             pop.style.display = 'none';

            //         that.map.setFilter("project-layer-hover", ["==", "id", ""]);
            //     }

            // });
            // that.map.on('click', function(e) {
            //     // var features = that.map.queryRenderedFeatures(e.point, { layers: ['projectLayer'] });
            //     // var feature = features[0];
            //     // if (features.length > 0){
            //     //     that.selectProject();
            //     //     that.dataService.selectProject(feature.properties.id);
            //     // }
            //      var features = that.map.queryRenderedFeatures(e.point, { layers: ['projectLayer'] });
            //     that.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
                
            //     var feature = features[0];
            //     if (features.length > 0){
                    
            //         that.map.setFilter('project-layer-hover', ["==", "id", feature.properties.id]);
            //         that.dataService.hoverProject(feature.properties.id);
                    
            //         let lngLat = JSON.parse(feature.properties.location);
            //         let wbcPopup = window.document.getElementById('wbc-popup-content');
                    
            //         popup
            //             .setLngLat(lngLat)
            //             .setDOMContent(wbcPopup)
            //             // .setHTML(that.makePopup(feature.properties))
            //             .addTo(that.map);
            //         wbcPopup.style.display = 'block';

            //         let pop = window.document.getElementsByClassName('mapboxgl-popup')[0] as HTMLElement;
            //         if(pop)
            //             pop.style.display = 'flex';

            //     } else {

            //         let pop = window.document.getElementsByClassName('mapboxgl-popup')[0] as HTMLElement;
                    
            //         if(pop)
            //             pop.style.display = 'none';

            //         that.map.setFilter("project-layer-hover", ["==", "id", ""]);
            //     }
            // });
            // that.map.on('mouseout', function(e) {
            //     that.map.setFilter("project-layer-hover", ["==", "id", ""]);
            // });
    }

    toGeoJson(data){
        let features = [];
        console.log(data);
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
