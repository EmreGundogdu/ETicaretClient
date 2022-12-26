import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService,spinner:NgxSpinnerService,private authService:AuthService) { 
    super(spinner);
  }

  ngOnInit(): void {
  }
  login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallPulseSync);
    this.userService.login(usernameOrEmail,password,()=>{
      this.authService.identityCheck();
      this.hideSpinner(SpinnerType.BallPulseSync);
    });
  }
}
