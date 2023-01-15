import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
  createdRole(createdRole: string) {
    this.listComponents.getRoles();
  }

}
