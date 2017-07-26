import { Component, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {UiService} from './services/ui.service';

import {RoutesRecognized, RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import * as _ from 'lodash';

import {trigger, state, animate, style, transition} from '@angular/animations';


@Component({
  selector: 'wbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger(
      'slideInAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class AppComponent {
  title = 'wbc';

    constructor(private router: Router, private route: ActivatedRoute, private uiService: UiService, private appRef: ApplicationRef, private changeDetectorRef: ChangeDetectorRef, private translate: TranslateService) { 
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('de');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('de');

        this.router.events.subscribe((event) => {
          if (event instanceof RoutesRecognized) {
            let leavingSlideIndex = _.get(event, 'state.root.firstChild.data.slideIndex');
            let enteringSlideIndex = _.get(this.route, 'snapshot.firstChild.data.slideIndex');
            if(leavingSlideIndex && enteringSlideIndex){
              this.uiService.setDirection(leavingSlideIndex > enteringSlideIndex ? 'bot' : 'top')
            } else {
              this.uiService.setDirection(null);
            }
            this.uiService.currentIndex = leavingSlideIndex;
          }
        });
    }

    openDetails(feature){
        this.uiService.selectedFeature = feature;
        this.uiService.showSelectedFeature = true;

    }


  // onActivate(e) {
  //     console.log(this.uiService.direction);
  //     this.appRef.tick();
  //     // console.log(e.orderId);
  //     // console.log(e.orderId);
  //     // console.log(this.uiService);
  //     if(this.uiService.currentPosition){
  //         console.log(e.orderId)
  //         console.log(this.uiService.currentPosition)
  //         if (e.orderId > this.uiService.currentPosition) {
  //             this.uiService.direction = 'down';
  //             this.uiService.setDirection('down');
  //         } else {
  //             this.uiService.setDirection('up');
  //             this.uiService.direction = 'up';
  //         }
  //     }
  //     console.log(this.uiService.direction);
  //     this.appRef.tick();
  //     // this.changeDetectorRef.detectChanges();
  //     console.log(e.orderId);
  //     this.uiService.currentPosition = e.orderId;
  // }
}
