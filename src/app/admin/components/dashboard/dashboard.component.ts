import { Component, OnInit } from '@angular/core';
import { AlertfiyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  ngOnInit(): void {
  }
m(){
  this.alertify.message("Merhaba",{
    messageType :MessageType.Success,
    delay : 2,
    dismissOthers:false,
    positiom:Position.BottomLeft
  })
}
d(){
  this.alertify.dismiss();
}
}
