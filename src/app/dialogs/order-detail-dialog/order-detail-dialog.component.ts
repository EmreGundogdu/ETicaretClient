import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/contracts/order/order';
import { MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string, private orderService: OrderService, private dialogService: DialogService, private toastrService: CustomToastrService) {
    super(dialogRef)
  }
  order: Order;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit(): Promise<void> {
    this.order = await this.orderService.getOrderById(this.data as string);
    this.dataSource = this.order.basketItems;
    this.totalPrice = this.order.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClsoed: async () => {
        await this.orderService.completeOrder(this.data as string);
        this.toastrService.message("Sipariş Başarıyla Tamamlanmıştır", "Sipariş Tamamlandı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomLeft
        })
      }
    });
  }

}

export enum OrderDetailDialogState {
  Close,
  OrderComplete
}
