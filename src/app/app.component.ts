import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageType } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService:AuthService,private toastrService:CustomToastrService){
authService.identityCheck();    
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastrService.message("Oturum Kapatılmıştır","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    });
  }
}
