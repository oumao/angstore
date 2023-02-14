import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service'

import { Item, Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = []
  pickedItem = '1'

  constructor(private httpService: HttpService, private cartService: CartService){}

  ngOnInit(){
    this.httpService.getProducts().subscribe(res => {
      this.products = res as Product[];
    })
  }

  

  onAddItemToCart(item: Product) {
    // const itemsInCart = this.cartService.getItemsInCart();
    // let itemInCart = itemsInCart.find((elem: any) => elem.id === item.id)

    // // Check to see if the item is already added
    // if(itemInCart){
    //   itemInCart.quantity = this.pickedItem;
    // }else{
    //   itemInCart = {
    //     id: item.id,
    //     name: item.name,
    //     quantity: this.pickedItem,
    //     price: item.price,
    //     url: item.url,
    //     description: item.description
    //   }
    //   itemsInCart.push(itemInCart);
    // }

    // // Store the updated items in the cart
    // this.cartService.addToCart(itemsInCart);
    // // alert(`${itemInCart.quantity} of ${itemInCart.name} added to cart`);
    // alert(`${itemInCart.quantity} ${itemInCart.name}${Number(itemInCart.quantity) > 1 ? 's' : ''} added to cart`);
  
    const itemsInCart = this.cartService.getItemsInCart();
    let itemIndex = itemsInCart.findIndex((elem: any) => elem.id === item.id);

    // Check to see if the item is already added
    if (itemIndex !== -1) {
      itemsInCart[itemIndex].quantity = this.pickedItem;
    } else {
      const itemInCart = {
        id: item.id,
        name: item.name,
        quantity: this.pickedItem,
        price: item.price,
        url: item.url,
        description: item.description
      };
      itemsInCart.push(itemInCart);
    }

    // Store the updated items in the cart
    this.cartService.addToCart(itemsInCart);
    alert(`${itemsInCart[itemsInCart.length-1].name} added to cart`);
    // alert(`${itemInCart.quantity} ${itemInCart.name}${Number(itemInCart.quantity) > 1 ? 's' : ''} added to cart`);
  }
}
