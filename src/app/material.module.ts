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
  MatSlideToggleModule,
  MatCardModule,
  MatTabsModule
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
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
