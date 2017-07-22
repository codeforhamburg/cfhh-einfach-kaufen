import { Component, OnInit, OnDestroy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { slideVertical } from '../app-routing-animations';
import { UiService } from '../services/ui.service';
import { Slideable } from '../abstract/RoutingAnimationHelper';

@Component({
  selector: 'wbc-donate-start',
  templateUrl: './donate-start.component.html',
  styleUrls: ['./donate-start.component.scss'],
  animations: [slideVertical],
  // host: {'[@routerSlide]': 'uiService.direction'}

})
export class DonateStartComponent extends Slideable implements OnInit, OnDestroy {

    public orderId = 2;
    // public direction;

    // constructor(private uiService: UiService, private ref: ChangeDetectorRef, private appRef: ApplicationRef) { }

    ngOnInit() {
        // this.uiService.direction$.subscribe(res => this.direction = res);
    }
    ngOnDestroy(){
        // this.ref.detectChanges();
    }

    // clicked() {
    //     console.log('click');
    //     this.ref.detectChanges();
    // }

}
