import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
    this.httpClient.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallback(message);
    })
  };

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClient.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message))
    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClient.delete<any>({
      controller: "products"
    }, id);
    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClient.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "products"
    }, id);
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImages(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClient.delete({
      action: "deleteProductImage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcase(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClient.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `ImageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
