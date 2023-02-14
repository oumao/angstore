import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Item, productcount } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product

  @Output() addProductToCart = new EventEmitter<Product>();

  
  productCount: string[] = productcount
  pickedItem = '1'

  constructor(private cartService: CartService) {
    this.product = { id:0, name:'', price:0, url:'', description:''}
  }

  changeSelected(value: unknown): void {
    this.pickedItem = value as unknown as string
  }

  addItemToCart(item: Product): void{
    this.addProductToCart.emit(item);
  }
}
