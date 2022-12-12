import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClient: HttpClientService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallPulseSync)
    this.httpClient.get({
      controller:"products",
    }).subscribe(data=>console.log(data));

    // this.httpClient.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:20
    // }).subscribe();
  }
}
