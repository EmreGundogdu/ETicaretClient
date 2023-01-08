import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient: HttpClientService, private toastrService: CustomToastrService) { }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClient.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Kullanıcı Girişi Başarıyla Sağlanmıştır", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomLeft
      })
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callbackFunction?: (state) => void): Promise<any> {

    const observable: Observable<any | TokenResponse> = this.httpClient.post({
      action: "refreshTokenLogin",
      controller: "auth"
    }, {
      refreshToken: refreshToken
    });
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    try {
      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
        callbackFunction(tokenResponse ? true : false);

      }
    } catch {
      callbackFunction(false);
    }
  }

  async googleLogin(user: SocialUser, callbackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClient.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "google-login"
    }, user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Google Login İşlemi Başarılı", "Giriş Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight });
    }
    callbackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClient.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "facebook-login"
    }, user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Facebook üzerinden başarıyla giriş sağlanmıştır", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      })
    }
    callBackFunction();
  }
}
