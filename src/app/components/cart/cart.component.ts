import { Component } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct'
import { productcount } from 'src/app/models/Product'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartProduct[] = [];
  productCount: string[] = productcount
  cartTotal: number = 0;
  fullName: string;
  address: string;
  creditCard: number | string

  constructor(private cartService: HttpService){
    this.fullName = '';
    this.address = '';
    this.creditCard = '';
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateProductTotal();
  }

  calculateProductTotal(): void {
    this.cartTotal = this.cartItems.reduce((curr: number, value: any) => {
      return curr + value.price * value.quantity as unknown as number;
    }, 0);

    this.cartTotal = Number(this.cartTotal.toFixed(2));
  }

  onCheckOut(): void{

  }
}
