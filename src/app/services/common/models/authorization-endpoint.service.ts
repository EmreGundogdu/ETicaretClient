import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpclientService: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallback?: () => void, errorCallback?: (error) => void) {
    const observable: Observable<any> = this.httpclientService.post({
      controller: "authorizationEndpoints"
    }, {
      roles: roles,
      code: code,
      menu: menu
    })
    const promiseData = observable.subscribe({
      next: successCallback,
      error: errorCallback
    });
    await promiseData;
  }
}
