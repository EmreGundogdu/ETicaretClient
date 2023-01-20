import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.css']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(dialogRef: MatDialogRef<QrcodeReadingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private qrCodeService: QrCodeService, private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  async ngOnInit() {
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
}
