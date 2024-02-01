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
  idCustomer: number = +this.getUser.getUserId();
  //inicializa el id del cliente para saber
  //si ya existe o no
  id_Order: number = 0;

  constructor(private productsAllService:ApiProductsAllService, private dialogService: DialogService,private getUser: AuthService,private Order:OrderCartService){}

  ngOnInit(): void { }

  //método para confirmar la compra
  checkout() {
    // RECORDATORIO:cambiar por una validación token
    if (this.idCustomer === 0) {
      console.log("Por favor, inicie sesión");
    } else {
      this.getOrderAndCreateHeader();
    }
  }
  //método para crear el encabezado de la compra y si
  //y llamar a crear los productos
  getOrderAndCreateHeader() {
    this.Order.getOrderById(this.idCustomer).subscribe((order: any) => {
      this.id_Order = order.id_order;
      if (this.id_Order === 0) {
        //se crea la forma del encabezado
        const newOrderHeader: OrderHeader = { "customer": this.idCustomer };
        //se registra el encabezado
        this.Order.createOrderHeader(newOrderHeader).subscribe(
          response => {
            console.log('Registro exitoso:', response);
            //se busca el id del cliente
            this.Order.getOrderById(this.idCustomer).subscribe((order: any) => {
              this.id_Order = order.id_order;
              // se crea los detalles
              this.createOrderDetails();
            });
          });
      } else {
        const newOrderHeader: OrderHeader = { "customer": this.idCustomer };
        console.log(newOrderHeader);
        console.log(this.id_Order);
        this.createOrderDetails();
      }

    });
  }

  // crea la orden de cada productos y luego las registra
  createOrderDetails() {
    this.productsAllService.getCart().subscribe(
      cartProducts => {
        cartProducts.forEach(element => {
          const newOrderDetail: OrderDetail = {
            "order_": this.id_Order,
            product: element.id_product,
            quantify: element.cantidad,
            total: element.cantidad * element.price
          };
          this.createOrderDetail(newOrderDetail);
        });
      },
      error => {
        console.error("Error al registrar la orden", error);
      }
    );
  }
  // se encarga de registrar los productos
  createOrderDetail(newOrderDetail: OrderDetail) {
    this.Order.createOrderDetail(newOrderDetail).subscribe(response => {
      console.log('Registro realizado', response);
    });
    this.productsAllService.cartClear();
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
