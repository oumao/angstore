import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Product } from '../models/Product';
import { CartProduct } from '../models/CartProduct';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  myStore = window.localStorage;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('../../assets/data.json')
  }

  // Adding an Item to a cart
  addToCart(product: CartProduct[]): void {
    this.myStore.setItem('cart', JSON.stringify(product));
  }

  // Clear Cart 
  clearCart(): void {
    this.myStore.clear();
  }

  // Getting Items in a Cart
  getCart(): CartProduct[] {
    const getItem = this.myStore.getItem('cart');
    return getItem? JSON.parse(getItem): [];
  }

}
