import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UiService } from './ui.service';

declare var mapboxgl: any;
declare var MapboxGeocoder: any;

@Injectable()
export class MapService {

    private data;
    private selectedFeature;
    private map;


    constructor(private dataService: DataService, private uiService: UiService) { }


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
       this. map.addControl(nav, 'top-right');

        // this.drawData(this.dataService.data);
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



        });
    }

    drawData(map, data){
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
        this.addMouseHandler(this.map);
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

        this.map.on('mousemove', function(e) {
            var features = that.map.queryRenderedFeatures(e.point, { layers: ['kaufhaus'] });
            that.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            if (features.length > 0){
                that.uiService.popupFeature = features[0];
                popup.setLngLat(features[0].geometry.coordinates)
                    // .setHTML(features[0].properties.title +  '<br>' + features[0].properties.address +  '<br> T - ' + features[0].properties.tel)
                    .setDOMContent(document.getElementById('wbc-popup'))
                    .addTo(that.map);
            } else {
                // map.getCanvas().style.cursor = '';
                that.uiService.popupFeature = null;
                // popup.remove();
            }
        });

        // this.map.on('click', function(e){
        //     var features = that.map.queryRenderedFeatures(e.point, { layers: ['kaufhaus'] });
        //     if (features.length > 0){
        //         that.selectedFeature = features[0];
        //         that.uiService.showSelectedFeature = true;
        //     }
        // });

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

}
