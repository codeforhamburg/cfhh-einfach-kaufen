import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'wbc-buy-start',
  templateUrl: './buy-start.component.html',
  styleUrls: ['./buy-start.component.scss']
})
export class BuyStartComponent {
    public orderId = 3;
    public direction;

    constructor(public dataService: DataService, private uiService2: UiService) {}
}
