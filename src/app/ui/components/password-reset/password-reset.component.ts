import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinnger: NgxSpinnerService, private userAuthService: UserAuthService, private alertify: AlertifyService) {
    super(spinnger)
  }
  passwordReset(email: string) {
    this.showSpinner(SpinnerType.BallPulseSync)
    this.userAuthService.passwordReset(email, () => this.hideSpinner(SpinnerType.BallPulseSync))
    this.alertify.message("Mail başarıyla gönderilmiştir", {
      messageType: MessageType.Notify,
      position: Position.TopRight
    });
  }
}
