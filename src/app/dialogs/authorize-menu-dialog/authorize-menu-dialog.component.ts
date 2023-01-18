import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List_Role } from 'src/app/contracts/role/role_list';
import { RoleService } from 'src/app/services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.css']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthroizeMenuState | any, private roleService: RoleService) {
    super(dialogRef)

  }
  roles: { datas: List_Role[], totalCount: number };

  async ngOnInit() {
    this.roles = await this.roleService.getRoles(-1, -1);
  }

  assignRoles(rolesComponent) {

  }
}

export enum AuthroizeMenuState {
  Yes,
  No
}
