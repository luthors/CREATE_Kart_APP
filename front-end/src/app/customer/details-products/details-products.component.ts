import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { Product } from '../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.css']
})

export class DetailsProductsComponent implements OnInit {
  
  product:any;
  // public listaProductos:any =[]

  constructor(private apiProductsAllService: ApiProductsAllService, private renderer: Renderer2, private route: ActivatedRoute){}

/*app - header*/
  ngOnInit(): void {
    // this.llenarData();
    // Estilos del body
    this.renderer.setStyle(document.body, 'background-color', 'black');
    this.renderer.setStyle(document.body, 'justify-content','center');
    this.renderer.setStyle(document.body, 'align-items','center');

    // this.product=this.apiProductsAllService.getProductDetails();
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    console.log(id)  
    this.apiProductsAllService.getProductById(id).subscribe((res: any)=>{
      this.product = res[0]
      console.log(this.product)
    
      })
  }

  // public llenarData(){
  //   this.apiProductsAllService.get('http://localhost:3001/api/products').subscribe(data => [
  //     this.listaProductos=data
  //   ])
  // }
  addToCart(product:Product){
    return this.apiProductsAllService.addProduct(product);
  }

/* Cantidad */
// numero: number = 1


}