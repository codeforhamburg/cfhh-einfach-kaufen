import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import {trigger, state, animate, style, transition} from '@angular/animations';

@Component({
  selector: 'wbc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
      ])
    ])
  ]
})
export class FooterComponent implements OnInit {

  constructor(private uiService: UiService) { }

  ngOnInit() {
  }

}
