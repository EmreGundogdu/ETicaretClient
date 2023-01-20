import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthroizeMenuComponent } from './authroize-menu/authroize-menu.component';
import { AuthroizeMenuModule } from './authroize-menu/authroize-menu.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    DashboardModule,
    AuthroizeMenuModule,
    RolesModule,
    UserModule
  ]
})
export class ComponentsModule { }
