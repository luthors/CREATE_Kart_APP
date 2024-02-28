import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { ElementRef } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { OrderCartService } from '../services/order-cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from '../services/dialog.service';
import { AddressService } from '../services/address.service'; /*Dirección de residencia */

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  @Input() viewEmail: boolean = false; // Definición de la propiedad de entrada viewEmail
  

  title = 'envioCorreos';
  datos: FormGroup;
  
  @Input() cartProducts: Product[] = [];
  @Input() totalOrder: number = 0;
  username: string = '';

  constructor(private httpclient: HttpClient, private productsAllService: ApiProductsAllService, private elementRef: ElementRef, private Order: OrderCartService, public authService: AuthService, private router: Router, private dialogService: DialogService, private addressService: AddressService) {
    this.datos = new FormGroup ({
      correo: new FormControl('',[Validators.required, Validators.email]),
      mensaje: new FormControl('',Validators.required)
    })

    this.username = this.authService.getUsername;
    this.cartProducts = this.productsAllService.getCartProducts();
  } 

  ngOnInit(): void {

  } 
  
  envioCorreo() {
    const userAddress = this.datos.value.mensaje;
    const orderDetails = this.cartProducts.map(product => ({
      product: product.id_product,
      quantify: product.cantidad,
      total: product.price * product.cantidad
    }));
    this.Order.createOrderDetail(orderDetails, userAddress).subscribe(response => {
      console.log('Registro realizado', response);
      this.addressService.updateCustomerAddress(userAddress) /*Dirección de residencia */
      this.sendEmail();
    });
  }


  sendEmail() {
    console.log('Enviar correo electrónico aquí');
    
    this.cleanCart();
    
    this.router.navigateByUrl('/products/template');
  }


  createOrderDetail(newOrderDetail: any) {
    let address = this.datos.value.mensaje;
    this.Order.createOrderDetail(newOrderDetail, address).subscribe(response => {
      console.log('Registro realizado', response);
    });
    this.router.navigateByUrl('/products/template');
  }


  confirmarPedido() {
    this.envioCorreo();
  }


  cleanCart() {
    this.productsAllService.cartClear();
    this.router.navigateByUrl('/products/template');
  }

  calcularTotalPedido(): number {
    let total = 0;
    this.cartProducts.forEach(product => {
      total += product.price * product.cantidad;
      return this.totalOrder;
    });
    return total;
  }

}