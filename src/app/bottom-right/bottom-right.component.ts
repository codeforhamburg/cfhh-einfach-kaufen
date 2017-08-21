import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {trigger, state, animate, style, transition} from '@angular/animations';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'wbc-bottom-right',
  templateUrl: './bottom-right.component.html',
  styleUrls: ['./bottom-right.component.scss'],
  animations: [
    trigger('slideInAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0.5}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0.5}))
        ])
      ]),
    trigger('slideInAnimationFromRight', [
        transition(':enter', [
          style({transform: 'translateX(120%)', opacity: 0.5}),
          animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(120%)', opacity: 0.5}))
        ])
    ])
  ]
})
export class BottomRightComponent implements OnInit {

    public langSwitch = false;

    constructor(private translate: TranslateService, public uiService: UiService) { }

    ngOnInit() {
    }
    toggleLangSwitch() {
        this.langSwitch = !this.langSwitch;
    }

    switchLang(lang){
      this.translate.use(lang);
      this.langSwitch = false;
    }

}
