import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail, OrderHeader } from '../interfaces/order.interface';
import { OrderCartService } from '../services/order-cart.service';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { environment } from 'src/environments/environments';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  baseUrl = environment.baseUrl;
  public listaProductos:any =[];
  myCart$=this.productsAllService.myCart$;
  //se obtiene el id del cliente por medio de un método Auth
  //inicializa el id del cliente para saber
  //si ya existe o no
  id_Order: number = 0;
  orderlist:any= [];

  constructor(private productsAllService:ApiProductsAllService, private dialogService: DialogService,private Order:OrderCartService){}

  ngOnInit(): void { }

  //método para confirmar la compra
  
  // crea la orden de cada productos y luego las registra
  createOrderDetails() {
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
        this.createOrderDetail(this.orderlist);
      },
      error => {
        console.error("Error al registrar la orden", error);
      }
    );
  }
  // se encarga de registrar los productos
  createOrderDetail(newOrderDetail:any) {
    this.Order.createOrderDetail(newOrderDetail).subscribe(response => {
      console.log('Registro realizado', response);
    });
  }

  totalProducts(price:number, units:number){
    return price*units;
  };

  deleteProduct(id:number){
    this.productsAllService.deleteProduct(id);
  };


  updateUnits(operation:string, id:number){
    const product =this.productsAllService.findProductById(id);
    if(product){
      if (operation === "minus" && product.cantidad>0){
        product.cantidad=product.cantidad-1;
      }//el metodo de la api impide que se agregue una cantidad
      //mayor a la existente
      if(operation === "add" && this.productsAllService.canAddUnitWithoutExceedingStock(id)){
        product.cantidad=product.cantidad+1;
      }
      if (product.cantidad===0) {
        this.deleteProduct(id);        
      }
    }
  };

  totalCart(){
    const result =this.productsAllService.totalCart();
    return result;
  };

  //no exceder el límite de cantidad establecida
  canAddUnitWithoutExceedingStock(productId: number): boolean {
    return this.productsAllService.canAddUnitWithoutExceedingStock(productId);
  }
  //saber si el carrito está vacío
  get isCartEmpty() {
    return this.productsAllService.isCartEmpty();
  };

  get cleanCart() {
    return this.productsAllService.cartClear();
  };


  //obtener los productos
  getProducts(){
    this.productsAllService.get(`${this.baseUrl}/api/products`).subscribe(data => [
      this.listaProductos=data,
      console.log(this.listaProductos)
    ])
  };


  /* Ventana dialogo email */
  openDialogCustom(){
    this.dialogService.openDialogCustom()
  };
}
