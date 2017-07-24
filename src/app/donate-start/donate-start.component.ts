import { Component, OnInit, OnDestroy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { UiService } from '../services/ui.service';
import { DataService } from '../services/data.service';

import { slideVertical } from '../app-routing-animations';
import { Slideable } from '../abstract/RoutingAnimationHelper';

@Component({
  selector: 'wbc-donate-start',
  templateUrl: './donate-start.component.html',
  styleUrls: ['./donate-start.component.scss'],
  animations: [slideVertical],
  // host: {'[@routerSlide]': 'uiService.direction'}

})
export class DonateStartComponent extends Slideable {

    public orderId = 2;
    // public direction;

    constructor(private dataService: DataService, protected cdRef2: ChangeDetectorRef, private uiService2: UiService) { 
      super(cdRef2, uiService2);

    }
}
