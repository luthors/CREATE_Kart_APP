import { Component, HostListener, OnInit } from '@angular/core'; //Search OnInit
import { AuthService } from 'src/app/auth/services/auth.service';
// import { LocalstorageService } from 'src/app/auth/services/localstorage.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/welcome/services/api.service'; //Search
import { ApiProductsAllService } from 'src/app/customer/services/api-products-all.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  up:boolean=true;
  search: String=''; //Variable para buscar
  isLoggedIn: boolean = false;
  username: string = '';
  viewCart: boolean = false;


  constructor(public authService: AuthService, private router: Router, private apiService: ApiService, private productsAllService: ApiProductsAllService) {//Se incorporó private apiService: ApiService
  }

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100){
      this.up=false;
    }else{
      this.up=true;
    }
  }

  logout(){
    this.authService.Logout();
    this.productsAllService.cartClear();
    // this.isLoggedIn = false;
    // this.username = '';
    this.router.navigate(['/'])
  }
  loginpage(){
    this.router.navigate(['/auth/login'])
  }

  onToggleCart(event: Event){
    event.preventDefault();
    this.viewCart=!this.viewCart;
  }

  ngOnInit(): void {//Search
    this.loadSearch();
    // this.isLoggedIn = this.authService.isLoggedInUser;
    this.authService.isLoggedIn$.subscribe(isLoggedIn=>{
      this.isLoggedIn=isLoggedIn
    })
    // obtener norble del usuario logeado    
    this.username = this.authService.getUsername;
  }


  //Search
  //Keyup: Cuando se escribe algo escucha los cambios, es un metodo "loadSearch", cargar búsqueda.
  //Filter se puede filtrar por marca, precio, color, talla.
  loadSearch(){
    /*Si es tipo string y validar si el tamaño de la cadena de texto está vacia,  ?searchNY=${}  Recibir en la url de mi api de lo que venga la variable.  */
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `${this.search}`: '';
    if(filter){
      this.router.navigate(['/products'], { queryParams: { filter: filter}});
    }
    
  }
}
