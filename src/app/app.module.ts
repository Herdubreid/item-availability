import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { E1ServiceModule } from 'e1-service';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { reducer, metaReducers } from './store/reducers';
import { E1EffectsService } from './e1/effects';
import { E1HelperService } from './e1/helper';

import { SignonPromptComponent } from './e1/signon-prompt.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemAvailabilityComponent } from './item-availability/item-availability.component';
import { ItemFilterPipe } from './item-filter.pipe';
import { ItemLedgerComponent } from './item-ledger/item-ledger.component';

@NgModule({
  declarations: [
    AppComponent,
    SignonPromptComponent,
    ItemSearchComponent,
    ItemAvailabilityComponent,
    ItemFilterPipe,
    ItemLedgerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    E1ServiceModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    EffectsModule.forRoot([E1EffectsService]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  entryComponents: [
    SignonPromptComponent
  ],
  providers: [
    E1HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
