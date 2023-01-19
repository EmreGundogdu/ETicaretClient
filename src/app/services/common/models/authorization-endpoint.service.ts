import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
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

  async getRolesToEndpoints(code: string, menu: string, successCallback?: () => void, errorCallback?: (error) => void): Promise<string[]> {
    const observable: Observable<any> = this.httpclientService.post({
      controller: "authorizationendpoints",
      action: "get-roles-to-endpoint"
    }, {
      code: code, menu: menu
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch(errorCallback);
    return (await promiseData).roles;
  }
}
