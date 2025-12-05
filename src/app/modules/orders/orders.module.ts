import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 1. Importar FormsModule

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';


@NgModule({
  declarations: [
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule
  ]
})
export class OrdersModule { }
