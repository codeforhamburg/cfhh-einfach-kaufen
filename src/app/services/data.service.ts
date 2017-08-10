import { Injectable, ApplicationRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var mapboxgl: any;


@Injectable()
export class DataService {

    // private _data: BehaviorSubject<List<Object>> = new BehaviorSubject(List([]));
    public categories = [];
    public activeCat;
    public data = new Subject();
    public staticData = undefined;
    public dataStadtteilNamen = [];

    @Input() textFieldVal : any;

    getData() {
        return this.data.asObservable();
    }

    constructor(private http: Http, private router: Router, private appRef: ApplicationRef) {

        //DEFINE CATEGORIES
        this.categories = [
            {
                "name": "Freizeit",
                "img": "assets/img/nav_main_bike.png",
                "active": false,
                "subs": [
                    { "name": "Fahrrad", "active": false },
                    { "name": "Bücher", "active": false },
                    { "name": "Spielzeug", "active": false },
                    { "name": "Cds", "active": false },
                    { "name": "Camping", "active": false },
                    { "name": "Schule", "active": false },
                    { "name": "Musik", "active": false }
                ]
            },
            {
                "name": "Kleidung",
                "img": "assets/img/nav_main_shirt.png",
                "active": false,
                "subs": [
                    { "name": "Schuhe", "active": false },
                    { "name": "Kleidung", "active": false },
                    { "name": "Hochzeit", "active": false }
                ]
            },
            {
                "name": "Haushalt",
                "img": "assets/img/nav_main_chair.png",
                "active": false,
                "subs": [
                    { "name": "stuff", "active": false },
                    { "name": "stuff2", "active": false },
                    { "name": "stuff3", "active": false }
                ]
            },
            {
                "name": "Sonstiges",
                "img": "assets/img/nav_main_stroller.png",
                "active": false,
                "subs": [
                    { "name": "sonstigerstuff", "active": false },
                    { "name": "auch", "active": false },
                    { "name": "nochmehr", "active": false }
                ]
            }
        ]

        // https://docs.google.com/spreadsheets/d/1HkqOPm5Q9Ey-gl781tu7wgtDLZvd6-KuxAUYe2axwqo/edit#gid=0
        http.get("https://spreadsheets.google.com/feeds/list/1HkqOPm5Q9Ey-gl781tu7wgtDLZvd6-KuxAUYe2axwqo/2/public/values?alt=json")
        .subscribe(res => {
            this.staticData = res.json().feed.entry;
            this.data.next(res.json().feed.entry);
        })


        http.get("./assets/data/Hamburg_Stadtteile.geojson")
            .subscribe(data => {
                let dataJson = data.json().features;
                
                for (let i = 0; i < dataJson.length; i++) {
                    let props = dataJson[i].properties;
                    let bounds = new mapboxgl.LngLatBounds();
                    props["geometry"] = dataJson[i].geometry;
                    props["source"] = "static";
                    
                    
                    let polyCoords = props.geometry.coordinates[0];
                    for (let j = 0; j < polyCoords.length; j++) {
                        var coords = polyCoords[j];
                        
                        bounds.extend(coords);
                    }
                    props["bounds"] = bounds;
                    
                    this.dataStadtteilNamen.push(props);
                }
                // sort alphabetically
                this.dataStadtteilNamen.sort(function (a, b) {
                    var textA = a.place_name.toUpperCase();
                    var textB = b.place_name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            });
    }

    activate(cat, type) {
        this.resetSubs(this.activeCat);
        this.activeCat = false;
        this.appRef.tick();
        this.categories.forEach(function (cate) {
            cate.active = false;
        });
        
        cat.active = true;
        this.activeCat = cat;
        

        if (type === 'buy') {
            this.router.navigateByUrl('kaufen-karte');
        } else if (type === 'donate') {
            this.router.navigateByUrl('spenden-karte');
        }
    }

    toggleSub(sub) {
        sub.active = !sub.active;
    }

    resetSubs(activeCat) {
        if (activeCat) {
            activeCat.subs.forEach(function (subItem) {
                if (subItem.active) {
                    subItem.active = false;
                }
            });
        }
    }
}
