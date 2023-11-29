import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  up:boolean=true;
  search: String=''; //Variable para buscar

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100){
      this.up=false;
    }else{
      this.up=true;
    }
  }
  
  
  //Search
  //Keyup: Cuando se escribe algo escucha los cambios, es un metodo "loadProducts".
  loadProducts(){
    console.log('this.search --> ',this.search)

  }

}
