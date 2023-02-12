import { Injectable } from '@angular/core';
import { Item } from '../models/Product'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

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
