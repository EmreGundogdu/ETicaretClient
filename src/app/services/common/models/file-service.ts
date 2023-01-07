import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/base-url';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClientService) { }

  async getBaseUrl(): Promise<BaseUrl> {
    const getObservable: Observable<BaseUrl> = this.httpClient.get<BaseUrl>({
      controller: "files",
      action: "getBaseUrl"
    });
    return await firstValueFrom(getObservable);
  }
}
