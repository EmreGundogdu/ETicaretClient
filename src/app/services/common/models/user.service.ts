import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { List_User } from 'src/app/contracts/users/list_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClient.post<Create_User | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }

  async updatePassword(userId: string, resetToken: string, passowrd: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClient.post({
      controller: "users",
      action: "update-password",
    }, {
      userId: userId,
      resetToken: resetToken,
      passowrd: passowrd,
      passwordConfirm: passwordConfirm
    });
    const promiseData: Promise<any> = await firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;

  }
  async getUsers(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalCount: number; users: List_User[] }> {
    const observable: Observable<{ totalCount: number; users: List_User[] }> = this.httpClient.get({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallback(error));
    return await promiseData;
  }

  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClient.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });
    const promiseData = firstValueFrom(observable)
    promiseData.then(() => successCallBack()).catch(error => errorCallBack(error))
    await promiseData;
  }

  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<{ userRoles: string[] }> = this.httpClient.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);
    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack()).then(error => errorCallBack(error));
    return (await promiseData).userRoles;
  }
}
