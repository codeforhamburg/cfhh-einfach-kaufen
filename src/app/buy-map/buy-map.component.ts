import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
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

  // constructor(private uiService: UiService) { }

  ngOnInit() {
  }

}
