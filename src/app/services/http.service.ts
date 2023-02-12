import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Product } from '../models/Product';
import { Item } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/data.json')
  }

  // // Adding an Item to a cart
  // addToCart(product: Item[]): void {
  //   window.localStorage.setItem('cart', JSON.stringify(product));
  // }

  addToCart(product: Item[]): void {
    let str = '[';
    product.map((item, index) => {
      str += `{
        "id": ${item.id},
        "name": "${item.name}",
        "price": ${item.price},
        "url": "${item.url}",
        "description": "${item.description}",
        "quantity": "${item.quantity}"
      }`;
      if (index !== product.length - 1) {
        str += ',';
      }
    });
    str += ']';
    window.localStorage.setItem('cart', str);
  }
  
   // Clear Cart 
  clearCartItems(): void {
    window.localStorage.clear();
  }
  
  // Getting Items in a Cart
  getItemsInCart(): Item[] {
    const getItem = window.localStorage.getItem('cart');

    if(!getItem){
      return [];
    }
    return JSON.parse(getItem);
  }

}
