import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProductsAllService } from '../../services/api-products-all.service';
import { environment } from 'src/environments/environments';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrl: './man.component.css'
})
export class ManComponent {
  baseUrl = environment.baseUrl
  categories : any[] = [];
  products : any[] = [];
  public listaProductos:any =[]
  constructor(private apiProductsAllService: ApiProductsAllService, private renderer: Renderer2, private router: Router,){}

  ngOnInit(): void {
    this.getProductsCategory()
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
    this.apiProductsAllService.get(`${this.baseUrl}/products`).subscribe(data => [
      this.listaProductos=data,
    ])
  }
  
  addToCart(product:Product){
    return this.apiProductsAllService.addProduct(product);
  }
  productDetail(product:Product){
    // this.apiProductsAllService.setProductDetails(product);
    // this.router.navigate(['/products/detailsproducts'])
    if (product.id_product){
      this.router.navigate(['/products/detailsproducts', product.id_product])
    }
  }



getProductsCategory(){
  this.apiProductsAllService.getProductsByMan().subscribe((res: any)=>{
  this.products = res
  this.listaProductos = this.products

  })
}
}
