import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Product, productcount } from 'src/app/models/Product';
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

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.product = { id:0, name:'', price:0, url:'', description:''}
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') as unknown as number;
    })

    this.httpService.getProducts().subscribe(res => {
      this.products = res;

      this.product = this.getItemById(Number(this.id));
      console.log(typeof(this.id));

      if (!this.product) {
        console.error(`No product found with id: ${this.id}`);
      } else {
        console.log(this.product);
      }
      
    })
  }

  getItemById(id: number): Product{
    return this.products.filter( item => item.id === id)[0];
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
