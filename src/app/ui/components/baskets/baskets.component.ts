import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastrService: CustomToastrService) {
    super(spinner)
  }
  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallPulseSync)
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallPulseSync)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallPulseSync)
    const basketItemId: string = object.target.attributes["basketItemId"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.quantity = quantity;
    this.hideSpinner(SpinnerType.BallPulseSync)
    await this.basketService.updateQuantity(basketItem);
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallPulseSync);
    $("." + basketItemId).fadeOut(2000, () => this.hideSpinner(SpinnerType.BallPulseSync))
    await this.basketService.remove(basketItemId);
    this.hideSpinner(SpinnerType.BallPulseSync)
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.BallPulseSync)
    const order: Create_Order = new Create_Order();
    order.address = "ADSADSA";
    order.description = "ADSADSA";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallPulseSync);
    this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturulmuştur", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomLeft
    });
  }
}
