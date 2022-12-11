import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show("s3");
    setTimeout(()=>{
      this.spinner.hide("s3");
    },1500)
  }

}
