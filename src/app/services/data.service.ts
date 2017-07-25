import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {

    // private _data: BehaviorSubject<List<Object>> = new BehaviorSubject(List([]));
    public categories = [];
    public activeCat;
    public data = new Subject();

    getData() {
        return this.data.asObservable();
    }

  constructor(private http: Http, private router: Router) { 

      //DEFINE CATEGORIES
      this.categories = [
          { 
              "name" : "Freizeit",
              "img" : "assets/img/placeholder.jpg",
              "active" : false,
              "subs" : [
                  { "name" : "Fahrrad", "active": false},
                  { "name" : "Bücher", "active": false},
                  { "name" : "Spielzeug", "active": false},
                  { "name" : "Cds", "active": false},
                  { "name" : "Camping", "active": false}
              ]
          },
          { 
              "name" : "Kleidung",
              "img" : "assets/img/placeholder.jpg",
              "active" : false,
              "subs" : [
                  { "name" : "Schuhe", "active": false},
                  { "name" : "Kleidung", "active": false},
                  { "name" : "Hochzeit", "active": false}
              ]
          },
          { 
              "name" : "Haushalt",
              "img" : "assets/img/placeholder.jpg",
              "active" : false,
              "subs" : [
                  { "name" : "stuff", "active": false},
                  { "name" : "stuff2", "active": false},
                  { "name" : "stuff3", "active": false}
              ]
          },
          { 
              "name" : "Sonstiges",
              "img" : "assets/img/placeholder.jpg",
              "active" : false,
              "subs" : [
                  { "name" : "sonstigerstuff", "active": false},
                  { "name" : "auch", "active": false},
                  { "name" : "nochmehr", "active": false}
              ]
          }
      ]

      http.get("https://spreadsheets.google.com/feeds/list/1HkqOPm5Q9Ey-gl781tu7wgtDLZvd6-KuxAUYe2axwqo/2/public/values?alt=json")
          .subscribe(res => {
              this.data.next(res.json().feed.entry);
          })
  }

  activate(cat, type){
      this.categories.forEach(function(cate){
          cate.active = false;
      });

      cat.active = true;
      this.activeCat = cat;
      console.log(this.categories);

      if (type === 'buy'){
          this.router.navigateByUrl('kaufen-karte');
      } else if (type === 'donate') {
          this.router.navigateByUrl('spenden-karte');
      }
  }

  toggleSub(sub){
      sub.active = !sub.active;
  }

}
