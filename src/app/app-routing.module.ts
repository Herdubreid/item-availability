import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemSearchComponent } from './item-search/item-search.component';

const routes: Routes = [
  { path: 'item-search', component: ItemSearchComponent },
  { path: '**', component: ItemSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
