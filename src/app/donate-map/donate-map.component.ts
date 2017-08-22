import { Component, OnInit, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UiService } from '../services/ui.service';
import { MapService } from '../services/map.service';
import { slideVertical } from '../app-routing-animations';
import { Slideable } from '../abstract/RoutingAnimationHelper';
import {trigger, state, animate, style, transition} from '@angular/animations';

@Component({
  selector: 'wbc-donate-map',
  templateUrl: './donate-map.component.html',
  styleUrls: ['./donate-map.component.scss'],
  animations: [slideVertical, trigger(
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
    )]
  // host: {'[@routerSlide]': 'uiService.direction'}

})
export class DonateMapComponent extends Slideable implements OnInit {

    public orderId = 1;

    constructor(public uiService2: UiService, private cdRef2: ChangeDetectorRef, public mapService: MapService) {
      super(cdRef2, uiService2);
    }

    ngOnInit() {
        this.mapService.initMap('wbc-donate-map');

    }

    // ngOnChanges() {
    //     console.log("change");
    // }

    // ngOnDestroy() {
    //     // this.changeDetectorRef.detectChanges();
    //     console.log("dest");
    // }

    openDetails(feature) {
      this.uiService2.selectedFeature = feature;
      this.uiService2.showSelectedFeature = true;
    }

}
