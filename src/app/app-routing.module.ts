import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemAvailabilityComponent } from './item-availability/item-availability.component';

const routes: Routes = [
  { path: 'item-search', component: ItemSearchComponent },
  { path: 'item-availability', component: ItemAvailabilityComponent },
  { path: '**', component: ItemSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
