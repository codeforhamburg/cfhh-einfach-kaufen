import { Component, OnInit, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UiService } from '../services/ui.service';
import { slideVertical } from '../app-routing-animations';
import { Slideable } from '../abstract/RoutingAnimationHelper';

@Component({
  selector: 'wbc-donate-map',
  templateUrl: './donate-map.component.html',
  styleUrls: ['./donate-map.component.scss'],
  animations: [slideVertical]
  // host: {'[@routerSlide]': 'uiService.direction'}

})
export class DonateMapComponent extends Slideable {

    public orderId = 1;

    // constructor(private uiService: UiService, private changeDetectorRef: ChangeDetectorRef) { }

    // ngOnInit() {
    // console.log("init")


    // }

    // ngOnChanges() {
    //     console.log("change");
    // }

    // ngOnDestroy() {
    //     // this.changeDetectorRef.detectChanges();
    //     console.log("dest");
    // }

}
