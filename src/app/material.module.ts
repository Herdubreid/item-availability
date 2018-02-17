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
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatSlideToggleModule
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
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
