import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { OrderDetail, OrderHeader } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderCartService {
  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  createOrderHeader(orderData:OrderHeader):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/order`,orderData);
  }

  createOrderDetail(orderDataDetail:OrderDetail):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/ordersdetail`,orderDataDetail);
  }

  getOrderById(idCustomer:number){
    return this.http.get(`${this.apiUrl}/api/orderbyid/`+idCustomer);
  }
}
