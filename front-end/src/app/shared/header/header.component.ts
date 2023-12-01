import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
// import { LocalstorageService } from 'src/app/auth/services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  up:boolean=true;
  search: String=''; //Variable para buscar
  isLoggedIn: boolean = false;
 
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedInUser;
    this.username = this.authService.getUsername;
  }

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

  logout(){
    this.authService.Logout();
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/'])
  }

}
