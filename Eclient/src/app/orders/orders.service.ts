import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder, IOrderItem } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get<any>(this.baseUrl + 'orders');
  }
  getOrdertailed(id: number) {
    return this.http.get<any>(this.baseUrl + 'orders/' + id);
  }
}
