import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UiService } from '../services/ui.service';
import { slideVertical } from '../app-routing-animations';
import { Slideable } from '../abstract/RoutingAnimationHelper';

@Component({
  selector: 'wbc-buy-start',
  templateUrl: './buy-start.component.html',
  styleUrls: ['./buy-start.component.scss'],
  animations: [slideVertical]
  // host: {'[@routerSlide]': 'direction'}
})
export class BuyStartComponent extends Slideable {

    public orderId = 3;
    public direction;

    // constructor(private uiService: UiService, private ref: ChangeDetectorRef) { }

    // ngOnInit() {
    //     this.uiService.direction$.subscribe(res => { 
    //         this.direction = res;
    //         this.ref.markForCheck();
    //         // this.ref.detectChanges();
    //     });
    // }

}
