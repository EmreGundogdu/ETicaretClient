import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthroizeMenuComponent } from './authroize-menu.component';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AuthroizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: AuthroizeMenuComponent }
    ]),
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AuthroizeMenuModule { }
