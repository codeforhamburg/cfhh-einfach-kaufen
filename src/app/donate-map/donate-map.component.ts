import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'wbc-donate-map',
  templateUrl: './donate-map.component.html',
  styleUrls: ['./donate-map.component.scss']
})
export class DonateMapComponent implements OnInit {

    public orderId = 1;

    constructor(public uiService2: UiService, public mapService: MapService) {}

    ngOnInit() {
        this.mapService.initMap('wbc-donate-map');

    }

    openDetails(feature) {
      this.uiService2.selectedFeature = feature;
      this.uiService2.showSelectedFeature = true;
    }

}
