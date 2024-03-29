import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { MessageType } from '../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekmektedir", "Oturum açınız", {
                  messageType: ToastrMessageType.Info,
                  position: ToastrPosition.TopLeft
                })
              else
                this.toastrService.message("Bu İşlemi yapmaya yetkiniz yoktur", "Yetkisiz İşlem", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopLeft
                });
            }
          }).then(data => {

          });


          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişilemiyor", "Sunucu Hatası", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopLeft
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı", "Geçersiz İşlem", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopLeft
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamamıştır", "404", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopLeft
          })
          break;

      }
      this.spinner.hide(SpinnerType.BallPulseSync)
      return of(error);
    }));
  }
}
