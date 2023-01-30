import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product
  pickedItem = '1'
  productCount: string[] | undefined = ['1', '2', '3', '4', '5']

  constructor(private productService: ProductService, 
              private cartService: CartService) {
    this.product = { id:0, name:'', price:0, url:'', description:''}
  }

  changeSelected(value: unknown): void {
    this.pickedItem = value as unknown as string
  }

  addItemToCart(item: Product): void{
    const itemsInCart = this.cartService.getCartItems();
    let itemInCart = itemsInCart.find((elem) => elem.id === item.id)

    // Check to see if the item is already added
    if(itemInCart){
      itemInCart.quantity = this.pickedItem;
      itemInCart ? this.productService.addProduct(itemsInCart) : null
    }
  }
}
