import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base-url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file-service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService) { }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  products: List_Product[];
  baseUrl: BaseUrl;

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseUrl();
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: { totalCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });
      this.products = data.products;
      this.products = this.products.map<List_Product>(x => {
        const listProduct: List_Product = {
          id: x.id,
          createdDate: x.createdDate,
          imagePath: `${x.productImageFiles.length ? x.productImageFiles.find(x => x.showcase).path : ""}`,
          name: x.name,
          price: x.price,
          stock: x.stock,
          updatedData: x.updatedData,
          productImageFiles: x.productImageFiles
        }
        return listProduct;
      })

      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];
      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    })
  }
}
