import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
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
}
