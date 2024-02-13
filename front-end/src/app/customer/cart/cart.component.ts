import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { NonNullableFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  /*Email */
  viewEmail: boolean=false;
  up:boolean=true;

  /*Email: Detalles del carrito del cliente */

  
  /*Productos en el carrito */
  myCart$=this.productsAllService.myCart$

  constructor(private productsAllService:ApiProductsAllService){}

  ngOnInit(): void {
      
  }

  totalProducts(price:number, units:number){
    return price*units;
  }

  deleteProduct(id:number){
    this.productsAllService.deleteProduct(id);
  }

  updateUnits(operation:string, id:number){
    const product =this.productsAllService.findProductById(id);

    if(product){
      if (operation === "minus" && product.cantidad>0){
        product.cantidad=product.cantidad-1;
      }
      if(operation === "add"){
        product.cantidad=product.cantidad+1;
      }
      if (product.cantidad===0) {
        this.deleteProduct(id);        
      }
    }
  }
  totalCart(){
    const result =this.productsAllService.totalCart();
    return result;
  }


  /* Ventana dialogo email */
  onToggleEmail(){
    console.log(this.viewEmail)
    this.viewEmail = !this.viewEmail
  }

  /*Cerrar la ventana de Email */
  closeModal(): void {
    this.viewEmail = false;
  }
  
}
