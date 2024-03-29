import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string, private productService: ProductService, private spinner: NgxSpinnerService, private dialogService: DialogService) {
    super(dialogRef)
  }


  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpeg, .jpg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmi seçin veya buraya sürükleyin",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }
  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallPulseSync);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallPulseSync));
  }

  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClsoed: async () => {
        this.spinner.show(SpinnerType.BallPulseSync)
        await this.productService.deleteImages(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.BallPulseSync);
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(300)
        });
      }
    })

  }
  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallPulseSync)
    this.productService.changeShowcase(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.BallPulseSync);
    })
  }

}

export enum SelectProductImageState {
  Close
}
