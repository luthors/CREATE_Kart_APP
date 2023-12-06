import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    SharedModule    
  ]
})
export class CustomerModule { }
