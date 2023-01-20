import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.css']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<QrcodeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private toastrService: CustomToastrService, private qrCodeService: QrCodeService, private domSanitizer: DomSanitizer, private spinner: NgxSpinnerService) {
    super(dialogRef)
  }
  qrCodeSafeUrl: SafeUrl;
  async ngOnInit() {
    this.spinner.show(SpinnerType.BllClipRotate)
    const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data)
    const url = URL.createObjectURL(qrCodeBlob)
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustHtml(url);
    this.spinner.hide(SpinnerType.BllClipRotate)
  }
}
