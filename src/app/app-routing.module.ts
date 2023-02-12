import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component'
import { CheckoutComponent } from './components/checkout/checkout.component'
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component'
import { ProductItemComponent } from './components/product-item/product-item.component'
import { ProductListComponent } from './components/product-list/product-list.component'

const routes: Routes = [
  {path: "", redirectTo: 'home',pathMatch: 'full'},
  {path: "home", component: ProductListComponent},
  {path: "cart", component: CartComponent},
  {path: "product", component: ProductItemComponent},
  {path: "item-detail/:id", component: ProductItemDetailComponent},
  {path: "checkout", component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
