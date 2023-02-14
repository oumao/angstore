import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Item } from 'src/app/models/Product'
import { productcount } from 'src/app/models/Product'
import { CartService } from 'src/app/services/cart.service'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Item[] = [];
  productCount: string[] = productcount

  cartTotal: number = 0;
  fullName: string;
  address: string;
  creditCard: number | string

  constructor(private cartService: CartService, private router: Router){
    this.fullName = '';
    this.address = '';
    this.creditCard = '';
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItemsInCart();
    this.calculateProductTotal();
  }

  calculateProductTotal(): void {
   let total = 0;

   this.cartItems.map(item => {
    total += item.price * Number(item.quantity);
   })

    this.cartTotal = Number(total.toFixed(2));
  }

  

  removeItem(id: number): void {
    // Check if the id of the item exists in the cartItems
    const itemIdx = this.cartItems.findIndex(item => item.id === id);

    if(this.cartItems.length > 0){
      
      // filter out the cart items without the removed Item 
      const updatedCartItems = this.cartItems.filter(item => item.id !== id);
      let itemInCart = this.cartItems.find((elem: any) => elem.id === id)

      this.cartItems = updatedCartItems;
      this.cartService.addToCart(this.cartItems);
      this.calculateProductTotal();

      alert(`Item ${itemInCart?.name} is removed from the cart`);

    }
  }

  // Update the quantities based on the selected input
  selectedQuantity(id: number, eventTarget: EventTarget | null): void {

    if(!eventTarget){
      return;
    }

    const selectOption = (eventTarget as HTMLSelectElement).value || '';

    const itemIdx = this.cartItems.findIndex(item => item.id === id);

    this.cartItems.length > 0 
    ? (this.cartItems[itemIdx].quantity = selectOption,
    this.cartService.addToCart(this.cartItems),
    this.calculateProductTotal()): null;
    
  }

  // Retrieve user details on Checkout
  onCheckOut(fullName: string): void{
    this.cartService.clearCartItems();
    this.router.navigate(["/checkout"], { queryParams: { cartTotal: this.cartTotal, fullName: this.fullName } });
  }

  // Validate Credit Card 
  validateCreditCard(control: any) {
    if (control.value.length !== 16 || !/^[0-9]+$/.test(control.value)) {
      control.setErrors({ pattern: true });
    } else {
      control.setErrors(null);
    }
  }
}
