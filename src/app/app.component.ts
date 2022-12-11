import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService:CustomToastrService){
    toastrService.message("Merhaba","Emre",ToastrMessageType.Error,ToastrPosition.TopRight);
    toastrService.message("Merhaba","Emre",ToastrMessageType.Info,ToastrPosition.BottomFullWidth);
    toastrService.message("Merhaba","Emre",ToastrMessageType.Success,ToastrPosition.TopCenter);
    toastrService.message("Merhaba","Emre",ToastrMessageType.Warning,ToastrPosition.TopLeft);
  }
}
