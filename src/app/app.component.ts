import { Component, ApplicationRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from './services/ui.service';
import { DataService } from './services/data.service';

import {RoutesRecognized, RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';

import { trigger, transition } from '@angular/animations';
import { hoch, runter } from './animations/routing_animation';


@Component({
  selector: 'wbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('kaufenStart => kaufenKarte', runter),
      transition('kaufenStart => spendenStart', hoch),
      transition('kaufenStart => spendenKarte', hoch),

      transition('kaufenKarte => kaufenStart', hoch),
      transition('kaufenKarte => spendenStart', hoch),
      transition('kaufenKarte => spendenKarte', hoch),

      transition('spendenStart => spendenKarte', hoch),
      transition('spendenStart => kaufenStart', runter),
      transition('spendenStart => kaufenKarte', runter),

      transition('spendenKarte => spendenStart', runter),
      transition('spendenKarte => kaufenStart', runter),
      transition('spendenKarte => kaufenKarte', runter),
    ])
  ]
})
export class AppComponent {
  title = 'wbc';

  constructor(private router: Router, private route: ActivatedRoute, public uiService: UiService,
    private appRef: ApplicationRef, private translate: TranslateService, public dataService: DataService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('de');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('de');
      }
      prepareRouteTransition(outlet) {
        const animation = outlet.activatedRouteData['animation'] || {};
        return animation['value'] || null;
      }
}
