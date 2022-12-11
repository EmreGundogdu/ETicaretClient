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
    toastrService.message("Merhaba","Emre",{
      messageType:ToastrMessageType.Error,
      position:ToastrPosition.TopRight
    });
    toastrService.message("Merhaba","Emre",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopLeft
    });
    toastrService.message("Merhaba","Emre",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.BottomLeft
    });
    toastrService.message("Merhaba","Emre",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.BottomRight
    });
  }
}
