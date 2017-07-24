import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UiService } from '../services/ui.service';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';
import { slideVertical } from '../app-routing-animations';
import { Slideable } from '../abstract/RoutingAnimationHelper';


@Component({
  selector: 'wbc-buy-map',
  templateUrl: './buy-map.component.html',
  styleUrls: ['./buy-map.component.scss'],
  animations: [slideVertical],
  // host: {'[@routerSlide]': 'uiService.direction'}

})
export class BuyMapComponent extends Slideable implements OnInit {

    public orderId = 4;

  constructor(private dataService: DataService, protected cdRef2: ChangeDetectorRef, private uiService2: UiService, private mapService: MapService) { 
      super(cdRef2, uiService2);

  }

  ngOnInit() {
    this.mapService.initMap('wbc-buy-map')
  }

}
