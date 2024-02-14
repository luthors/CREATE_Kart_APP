import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private urlApi ='http://localhost:3001/api/destacados';
  private urlSearch ='http://localhost:3001';  //Search, descomentar.

  constructor(private http: HttpClient) { }

  public get(url:string){
    return this.http.get(url);
  }

  //Search: get products
  getSearchProducts(title:string){
    return this.http.get(`${this.urlSearch}/api/search/${title}`);
    //Localhost: 3001/products/getSearch?searchBy= Valor del parámetro para buscar
    
  }
}
