import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirectiveDirective } from './directives/common/dynamic-load-component-directive.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirectiveDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirectiveDirective;
  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private httpClientService: HttpClientService, private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Kapatılmıştır", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContaineref);
  }
}
