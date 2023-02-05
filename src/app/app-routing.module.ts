import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component'
import { CheckoutComponent } from './components/checkout/checkout.component'
import { ProductItemComponent } from './components/product-item/product-item.component'
import { ProductListComponent } from './components/product-list/product-list.component'

const routes: Routes = [
  {path: "", redirectTo: 'home',pathMatch: 'full'},
  {path: "home", component: ProductListComponent},
  {path: "cart", component: CartComponent},
  {path: "product", component: ProductItemComponent},
  {path: "checkout", component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
