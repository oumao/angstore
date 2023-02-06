import { Component } from '@angular/core';
import { Router } from '@angular/router'
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

  constructor(private cartService: HttpService, private router: Router){
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

  selectedQuantity(id: number, event: any): void {
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const itemIdx = this.cartItems.findIndex(item=> item.id === id);
    itemIdx != -1 && this.cartItems.length > 0 ? this.cartItems[itemIdx].quantity = selectedOption: null;

    this.cartItems.length > 0 ? this.cartService.addToCart(this.cartItems) : null;
    this.calculateProductTotal();
  }

  removeItem(id: number): void {
    const itemIdx = this.cartItems? this.cartItems.findIndex(item => item.id === id) : -1;

    if(itemIdx != -1 && this.cartItems.length > 0){
      this.cartItems.splice(itemIdx, 1);
      this.cartService.addToCart(this.cartItems);
      this.calculateProductTotal();
    }
  }

  onCheckOut(fullName: string): void{
    this.cartService.clearCart();
    this.router.navigate(["/checkout"])
  }
}
