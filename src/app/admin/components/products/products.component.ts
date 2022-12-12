import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
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
    this.httpClient.get<Product[]>({
      controller: "products",
    }).subscribe(data => console.log(data));

    // this.httpClient.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:20
    // }).subscribe();
    // this.httpClient.put({
    //   controller: "products"
    // },{
    //   id:"306412bd-501d-4c84-8c75-e9b9a8d07515",
    //   name:"Renkli Kalem",
    //   stock:500,
    //   price:5
    // }).subscribe();

    // this.httpClient.delete({
    //   controller:"products"
    // },"306412bd-501d-4c84-8c75-e9b9a8d07515").subscribe();
    // this.httpClient.get({
    //   fullEndpoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=>console.log(data))
  }
}
