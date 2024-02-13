import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { ElementRef } from '@angular/core';/*Mensaje tabla de pedidos */
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  title = 'envioCorreos';
  datos:FormGroup;
  

  /*Email: Detalles de los productos del carrito del cliente */
  cartProducts: Product[] = [];  /*almacenar los productos del carrito*/

  constructor(private httpclient: HttpClient, private productsAllService: ApiProductsAllService, private elementRef: ElementRef){
    this.datos = new FormGroup ({
      correo: new FormControl('',[Validators.required, Validators.email]),
      mensaje: new FormControl('',Validators.required)
    })
  } 

  ngOnInit(): void {
    /*Email: Detalles de los productos del carrito del cliente */
    this.cartProducts = this.productsAllService.getCartProducts();
  } 

  
  envioCorreo(){

    // Obtener el valor total del pedido
    let totalPedido = this.calcularTotalPedido();

    // Contenido HTML de la tabla
    let tablaHTML = this.buildTableRows();/*this.elementRef.nativeElement.querySelector('.mensaje-predefinido').innerHTML;*/

    // Valor del control del formulario mensaje
    let mensaje = this.datos.value.mensaje;

    // Concatenar el contenido de la tabla al mensaje (dirección de entrega)
    let mensajeConTablaYTotal = `<b>Dirección de entrega:</b> ${mensaje} <br><br> 
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Decripción</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${tablaHTML}
      </tbody>
    </table>
    <p>Valor total: $${totalPedido}</p>
    <br><br><br> ¡Gracias por su compra!`;/*`<b> Dirección de entrega:   </b> ${mensaje} <br><br> ${tablaHTML} <br><br><br> ¡Gracias por su compra!`;*/
    

    let params = {
      email: this.datos.value.correo,/*email: back */
      mensaje: mensajeConTablaYTotal/*this.datos.value.mensaje*/
    }
    console.log(params);
    

    /*solicitud HTTP al backend */
    this.httpclient.post('http://localhost:3001/api/envio', params).subscribe(resp=>{
      console.log(resp); 
    })
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



  calcularTotalPedido(): number {
    let total = 0;
    this.cartProducts.forEach(product => {
      total += product.price * product.cantidad;
    });
    return total;
  }

}