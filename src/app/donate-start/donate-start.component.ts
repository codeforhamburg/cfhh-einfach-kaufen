import { Component, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { UiService } from '../services/ui.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'wbc-donate-start',
  templateUrl: './donate-start.component.html',
  styleUrls: ['./donate-start.component.scss']
})
export class DonateStartComponent {

    public orderId = 2;
    // public direction;

    constructor(public dataService: DataService, private uiService2: UiService) {}
}
