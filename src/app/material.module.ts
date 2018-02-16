import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressBarModule
} from '@angular/material';
/**
 * App's Material Modules
 */
@NgModule({
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
