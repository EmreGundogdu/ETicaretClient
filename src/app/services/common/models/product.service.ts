import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
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

  async read(page:number=0,size:number=5, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{totalCount:number;products:List_Product[]}> {
    const promiseData: Promise<{totalCount:number;products:List_Product[]}> = this.httpClient.get<{totalCount:number;products:List_Product[]}>({
      controller: "products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();
    
    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message))
    return await promiseData;
  }
}
