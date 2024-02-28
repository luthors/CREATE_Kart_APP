import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { ElementRef } from '@angular/core';/*Mensaje tabla de pedidos */
import { Product } from '../interfaces/product.interface';
import { OrderDetail } from '../interfaces/order.interface';
import { OrderCartService } from '../services/order-cart.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  title = 'envioCorreos';
  datos: FormGroup;
  orderlist: any = [];
  /*Email: Detalles de los productos del carrito del cliente */
  cartProducts: Product[] = [];  /*almacenar los productos del carrito*/
  constructor(private productsAllService: ApiProductsAllService, private Order: OrderCartService) {
    this.datos = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.cartProducts = this.productsAllService.getCartProducts();
  }
  envioCorreo() {
    this.orderlist = [];
    console.log(this.orderlist);
    this.productsAllService.getCart().subscribe(
      cartProducts => {
        cartProducts.forEach(element => {
          const newOrderDetail: OrderDetail = {
            product: element.id_product,
            quantify: element.cantidad,
            total: element.cantidad * element.price
          };
          this.orderlist.push(newOrderDetail);
        });
        console.log(this.orderlist, 'lista repetida');
        this.createOrderDetail(this.orderlist);
      },
      error => {
        console.error("Error al clasificar la orden", error);
      }
    );
  }
  // se encarga de registrar los productos
  createOrderDetail(newOrderDetail: any) {
    let address = this.datos.value.mensaje;
    this.Order.createOrderDetail(newOrderDetail, address).subscribe(response => {
      console.log('Registro realizado', response);
    });
  }
  buildTableRows() {
    let tableRows = '';
    this.cartProducts.forEach(product => {
      tableRows += `
        <tr class="table-light">
          <td><img src="${product.url}" alt="${product.title}" style="max-width: 100px; max-height: 100px;"></td>
          <td>${product.descrip}</td>
          <td>${product.title}</td>
          <td>$ ${product.price}</td>
          <td>${product.cantidad}</td>
          <td>$ ${product.price * product.cantidad}</td>
        </tr>
      `;
    });
    return tableRows;
  }
  get cleanCart() {
    return this.productsAllService.cartClear();
  };
  calcularTotalPedido(): number {
    let total = 0;
    this.cartProducts.forEach(product => {
      total += product.price * product.cantidad;
    });
    return total;
  }

}