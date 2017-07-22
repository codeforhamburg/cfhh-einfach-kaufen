import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyStartComponent } from './buy-start/buy-start.component';
import { BuyMapComponent } from './buy-map/buy-map.component';
import { DonateMapComponent } from './donate-map/donate-map.component';
import { DonateStartComponent } from './donate-start/donate-start.component';

import { CanDeactivateAfterChangeDetectionGuard } from './guards/can-deactivate-after-change-detection.guard';

const routes: Routes = [
    { path: '', redirectTo: 'kaufen', pathMatch: 'full' },
    { path: 'spenden-karte', component: DonateMapComponent, data : { slideIndex : 1}, canDeactivate: [CanDeactivateAfterChangeDetectionGuard] },
    { path: 'spenden', component: DonateStartComponent, data : { slideIndex : 2}, canDeactivate: [CanDeactivateAfterChangeDetectionGuard] },
    { path: 'kaufen', component: BuyStartComponent, data : { slideIndex : 3}, canDeactivate: [CanDeactivateAfterChangeDetectionGuard] },
    { path: 'kaufen-karte', component: BuyMapComponent, data : { slideIndex : 4}, canDeactivate: [CanDeactivateAfterChangeDetectionGuard] }
    // { path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
