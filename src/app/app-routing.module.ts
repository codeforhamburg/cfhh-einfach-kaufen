import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyStartComponent } from './buy-start/buy-start.component';
import { BuyMapComponent } from './buy-map/buy-map.component';
import { DonateMapComponent } from './donate-map/donate-map.component';
import { DonateStartComponent } from './donate-start/donate-start.component';

const routes: Routes = [
    { path: '', redirectTo: 'kaufen', pathMatch: 'full' },
    { path: 'spenden-karte', component: DonateMapComponent, data: { slideIndex: 1, animation: {value: 'spendenKarte'}} },
    { path: 'spenden', component: DonateStartComponent, data: { slideIndex: 2, animation: { value: 'spendenStart' }} },
    { path: 'kaufen', component: BuyStartComponent, data : { slideIndex : 3, animation: {value: 'kaufenStart'}} },
    { path: 'kaufen-karte', component: BuyMapComponent, data: { slideIndex: 4, animation: { value: 'kaufenKarte' }} },
    { path: '**', redirectTo: 'kaufen'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
