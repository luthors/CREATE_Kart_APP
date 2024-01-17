import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { Product } from '../interfaces/product.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  baseUrl = environment.baseUrl
  categories : any[] = [];
  products : any[] = [];
  public listaProductos:any =[]

  constructor(private apiProductsAllService: ApiProductsAllService, private renderer: Renderer2, private router: Router,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.llenarData();


    // Estilos del body
    this.renderer.setStyle(document.body, 'background-color', 'black');
    // this.renderer.setStyle(document.body, 'width','100%');
    // this.renderer.setStyle(document.body, 'height','100vh');
    // this.renderer.setStyle(document.body, 'display','flex');
    this.renderer.setStyle(document.body, 'justify-content','center');
    this.renderer.setStyle(document.body, 'align-items','center'); 
    // this.renderer.setStyle(document, 'box-sizing', 'border-box');
  }

  public llenarData(){
    //para que funcione lo de las variables de entorno hay que asegurarse
    //de poner un "/" despues de copiar la baseUrl 
    this.apiProductsAllService.get(`${this.baseUrl}/api/products`).subscribe(data => [
      this.listaProductos=data,
      console.log(this.listaProductos)
    ])
  }
  
  addToCart(product:Product){
    return this.apiProductsAllService.addProduct(product);
  }
  productDetail(product:Product){
    this.apiProductsAllService.setProductDetails(product);
    this.router.navigate(['/products/detailsproducts'])
  }

  


}


