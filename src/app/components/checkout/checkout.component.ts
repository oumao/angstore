import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartTotal: number = 0;
  firstName: string = '';
  
  constructor(private route: ActivatedRoute){}

  ngOnInit(){ 
    let fullName = this.route.snapshot.queryParams['fullName'];
    this.cartTotal = +this.route.snapshot.queryParams['cartTotal'];

    this.firstName = fullName.substr(0, fullName.indexOf(' '));
  }
}
