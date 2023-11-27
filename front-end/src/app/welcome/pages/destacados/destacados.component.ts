import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {

  // @Input() dataEntrante:any;
  public listaProductos:any =[]
  
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.llenarData();
  }
  public llenarData(){
    this.apiService.get('http://localhost:3001/api/destacados').subscribe(data => [
      this.listaProductos=data
    ])
  }

  slideConfig={"slidesToShow":2, "slidesToScroll":1, "infinite":true, "nextArrow":false, "prevArrow":false};

}
