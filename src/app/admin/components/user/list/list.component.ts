import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private userService: UserService, private alertifyService: AlertifyService, private dialogService: DialogService) {
    super(spinner)
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'completed', 'delete', 'viewDetail'];
  dataSource: MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.BallPulseSync);
    const allUsers: { totalCount: number; users: List_User[] } = await this.userService.get(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallPulseSync), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.BottomRight
    }))
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalCount;
    this.dataSource.paginator = this.paginator;
  }
  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }
}
