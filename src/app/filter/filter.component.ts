import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';
import { UiService } from '../services/ui.service';
import {trigger, state, animate, style, transition} from '@angular/animations';

@Component({
  selector: 'wbc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [trigger(
      'slideInOutAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0.5}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1, position: 'absolute', top: '20px'}),
          animate('250ms', style({transform: 'translateX(300%)', opacity: 0.5, position: 'absolute', top: '20px'}))
        ])
      ]
    )]
})
export class FilterComponent implements OnInit {

  constructor(private dataService: DataService, private mapService: MapService, private uiService: UiService) { }

  ngOnInit() {
  }

}
