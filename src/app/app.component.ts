import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService:CustomToastrService){
    toastrService.message("Merhaba","Emre",ToastrMessageType.Error);
    toastrService.message("Merhaba","Emre",ToastrMessageType.Info);
    toastrService.message("Merhaba","Emre",ToastrMessageType.Success);
    toastrService.message("Merhaba","Emre",ToastrMessageType.Warning);
  }
}
