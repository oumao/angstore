import { Component, Input } from '@angular/core';
import { Product, productcount } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product

  pickedItem = '1'
  productCount: string[] = productcount

  constructor(private httpService: HttpService) {
    this.product = { id:0, name:'', price:0, url:'', description:''}
  }

  changeSelected(value: unknown): void {
    this.pickedItem = value as unknown as string
  }

  addItemToCart(item: Product): void{
    const itemsInCart = this.httpService.getCart();
    let itemInCart = itemsInCart.find((elem: any) => elem.id === item.id)

    // Check to see if the item is already added
    if(itemInCart){
      itemInCart.quantity = this.pickedItem;
    }else{
      itemInCart = {
        id: item.id,
        name: item.name,
        quantity: this.pickedItem,
        price: item.price,
        url: item.url,
        description: item.description
      }
      itemsInCart.push(itemInCart);
    }

    // Store the updated items in the cart
    this.httpService.addToCart(itemsInCart);
  }
}
