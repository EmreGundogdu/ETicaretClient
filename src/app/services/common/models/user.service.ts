import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService) { }

  async create(user: User) :Promise<Create_User>{
    debugger;
    const observable: Observable<Create_User | User> = this.httpClient.post<Create_User | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }
}
