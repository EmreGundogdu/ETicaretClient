import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent,
    SelectProductImageDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DialogModule { }
