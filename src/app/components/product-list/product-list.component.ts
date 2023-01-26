import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service'

import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = []

  constructor(private httpService: HttpService){}

  ngOnInit(){
    this.httpService.getProducts().subscribe(res => {
      console.log(res)
      this.products = res as Product[];
    })
  }
}
