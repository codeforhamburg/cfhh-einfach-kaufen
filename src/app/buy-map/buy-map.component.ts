import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';
import {trigger, state, animate, style, transition} from '@angular/animations';


@Component({
  selector: 'wbc-buy-map',
  templateUrl: './buy-map.component.html',
  styleUrls: ['./buy-map.component.scss'],
  animations: [trigger(
      'slideInAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0.5}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0.5}))
        ])
      ]
    )],
  // host: {'[@routerSlide]': 'uiService.direction'}

})
export class BuyMapComponent implements OnInit {

    public orderId = 4;

    constructor(public dataService: DataService, public uiService2: UiService, private mapService: MapService) {}

  ngOnInit() {
    this.mapService.initMap('wbc-buy-map');
  }


  openDetails(feature) {
    this.uiService2.selectedFeature = feature;
    this.uiService2.showSelectedFeature = true;
  }
}
