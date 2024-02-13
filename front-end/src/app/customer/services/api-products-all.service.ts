import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environments';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiProductsAllService {
  baseApi = environment.baseUrl;
  //Lista Productos
  private myList: Product[] = [];
  //Carrito Observable
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  //para enviar al detalle de producto
  private productDet: any;


  constructor(private http: HttpClient) {

    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      this.myList = JSON.parse(carritoGuardado);
      this.myCart.next(this.myList);
    }
  }

  public get(url: string) {
    return this.http.get(url);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseApi}/api/productbyid/${id}`);
  }

  // Método para establecer el objeto a compartir
  setProductDetails(product: any) {
    this.productDet = product;
    console.log(this.productDet)
  }
  // Método para obtener el objeto compartido
  getProductDetails() {
    return this.productDet;
  }

  //productos de mujeres
  getProductsByWoman() {
    return this.http.get(`${this.baseApi}/api/category/mujer`)
  }
  //traer los productos de hombres
  getProductsByMan() {
    return this.http.get(`${this.baseApi}/api/category/hombre`)
  };



  // Metodos carrito de compras

  // addProduct(product: Product){
  //   // console.log(product)
  //   if(this.myList.length ===0){
  //     product.cantidad =1;
  //     this.myList.push(product)
  //     // Guardar el carrito actualizado en el almacenamiento local
  //     localStorage.setItem('cart', JSON.stringify(this.myList));
  //     this.myCart.next(this.myList);
  //   }else{
  //     const productMod = this.myList.find((element)=>{
  //       return element.id_product === product.id_product
  //     })
  //     if(productMod ){
  //       productMod.cantidad=productMod.cantidad+1;
  //       // Guardar el carrito actualizado en el almacenamiento local
  //       localStorage.setItem('cart', JSON.stringify(this.myList));
  //       this.myCart.next(this.myList);
  //     }else{
  //       product.cantidad=1;
  //       this.myList.push(product)
  //       // Guardar el carrito actualizado en el almacenamiento local
  //       localStorage.setItem('cart', JSON.stringify(this.myList));
  //       this.myCart.next(this.myList);
  //     }
  //   }
  // }

  addProduct(product: Product) {
    const existingProduct = this.myList.find((element) => element.id_product === product.id_product);

    if (existingProduct) {
      // Si el producto ya existe en el carrito
      if (this.canAddUnitWithoutExceedingStock(existingProduct.id_product)) {
        existingProduct.cantidad = existingProduct.cantidad + 1;
      } else {
        console.log("No se puede agregar más cantidad. Stock máximo alcanzado.");

      }
    } else {
      // if(this.canAddUnitWithoutExceedingStock(product.id_product)){
      //   product.cantidad = 1;
      //   this.myList.push(product);
      // }else{
      //   console.log("No se puede agregar no hay cantidad suficiente");

      // }
      product.cantidad = 1;
      this.myList.push(product);
      // Si el producto no existe en el carrito

    }
    this.myCart.next(this.myList);
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }

  deleteProduct(id: number) {
    this.myList = this.myList.filter((product) => {
      return product.id_product != id
    })
    this.myCart.next(this.myList);
    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }

  findProductById(id: number) {
    return this.myList.find((element) => {
      return element.id_product === id;
    })
  }

  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.price); }, 0);
    return total;
  }

  totalUnits() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad); }, 0);
    return total;
  }

  cartClear() {
    this.myList = [];
    localStorage.setItem('cart', JSON.stringify(this.myList));
    this.myCart.next(this.myList);
  }



  // Email: Método para obtener los productos del carrito
  getCartProducts(): Product[] {
    return this.myCart.getValue();
  }

  //saber si el carrito está vacío;
  isCartEmpty(): boolean {
    return this.myList.length === 0;
  };
  //obtener los productos del carro
  getCart(): Observable<Product[]> {
    return this.myCart.asObservable();
  };
  //no superar el total de los productos
  canAddUnitWithoutExceedingStock(productId: number): boolean {
    const product = this.findProductById(productId);
    return product ? product.cantidad + 1 <= product.quantify : false;
  }


}
