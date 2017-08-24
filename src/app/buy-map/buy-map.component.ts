import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'wbc-buy-map',
  templateUrl: './buy-map.component.html',
  styleUrls: ['./buy-map.component.scss']
})
export class BuyMapComponent implements OnInit {

    public orderId = 4;

    constructor(public uiService2: UiService, private mapService: MapService) {}

  ngOnInit() {
    this.mapService.initMap('wbc-buy-map');
  }


  openDetails(feature) {
    this.uiService2.selectedFeature = feature;
    this.uiService2.showSelectedFeature = true;
  }
}
