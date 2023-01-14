import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-complete-order-dialog',
  templateUrl: './complete-order-dialog.component.html',
  styleUrls: ['./complete-order-dialog.component.css']
})
export class CompleteOrderDialogComponent extends BaseDialog<CompleteOrderDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<CompleteOrderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CompleteOrderState) {
    super(dialogRef)
  }

  ngOnInit(): void {
  }
  complete() {

  }
}

export enum CompleteOrderState {
  Yes,
  No
}
