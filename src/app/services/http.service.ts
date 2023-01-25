import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  products: Product[] = []

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('../../assets/data.json')
  }
}
