import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


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
import { BottomRightComponent } from './bottom-right/bottom-right.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AutocompleteFilterComponent } from './autocomplete-filter/autocomplete-filter.component';
import { AutocompleteFilterService } from "./autocomplete-filter/autocomplete-filter.service"
import { FormsModule } from '@angular/forms';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';

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
    InfoboxComponent,
    BottomRightComponent,
    AutocompleteFilterComponent,
    DropdownFilterComponent
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
    NguiAutoCompleteModule,
    FormsModule
  ],
  providers: [UiService, CanDeactivateAfterChangeDetectionGuard, DataService, MapService, AutocompleteFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
