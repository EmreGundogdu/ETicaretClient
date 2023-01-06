import { Component, OnInit } from '@angular/core';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: List_Product[];
  async ngOnInit() {
    const data: { totalCount: number, products: List_Product[] } = await this.productService.read(0, 12,
      () => {

      },
      errorMessage => {

      });
    this.products = data.products;
  }

}
