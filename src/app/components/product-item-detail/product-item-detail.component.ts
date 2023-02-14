import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Product, productcount } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent {
  id: number  = 0;
  products: Product[] = []
  product: Product
  productCount: string[] = productcount

  pickedItem = '1'

  constructor(private cartService: CartService, private httpService: HttpService, private route: ActivatedRoute) {
    this.product = { id:0, name:'', price:0, url:'', description:''}
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') as unknown as number;
    })


    this.httpService.getProducts().subscribe(data => {
      this.products = data;
      this.product = this.getItemById(Number(this.id));
    })
  }

  getItemById(id: number): Product{
    const filtered = this.products.filter( item => item.id === id);
    return filtered[0];
  }

  changeSelected(value: unknown): void {
    this.pickedItem = value as unknown as string
  }

  addItemToCart(item: Product): void{
    const itemsInCart = this.cartService.getItemsInCart();
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
    this.cartService.addToCart(itemsInCart);

    alert(`${itemInCart.quantity} ${itemInCart.name}${Number(itemInCart.quantity) > 1 ? 's' : ''} added to cart`);
  }
  
}
