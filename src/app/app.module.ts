import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyStartComponent } from './buy-start/buy-start.component';
import { BuyMapComponent } from './buy-map/buy-map.component';
import { DonateStartComponent } from './donate-start/donate-start.component';
import { DonateMapComponent } from './donate-map/donate-map.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

import { UiService } from './services/ui.service';
import { DataService } from './services/data.service';
import { MapService } from './services/map.service';

import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CanDeactivateAfterChangeDetectionGuard } from './guards/can-deactivate-after-change-detection.guard';
import { FilterComponent } from './filter/filter.component';
import { IconFilterComponent } from './icon-filter/icon-filter.component';
import { InfoboxComponent } from './infobox/infobox.component';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    BuyStartComponent,
    BuyMapComponent,
    DonateStartComponent,
    DonateMapComponent,
    FooterComponent,
    NavComponent,
    FilterComponent,
    IconFilterComponent,
    InfoboxComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
        }
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [UiService, CanDeactivateAfterChangeDetectionGuard, DataService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
