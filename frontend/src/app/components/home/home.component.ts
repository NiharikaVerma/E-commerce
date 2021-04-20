import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../Services/product.service";
import {Router} from "@angular/router";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private  productService: ProductService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
     // @ts-ignore
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
       this.products = prods.products;
     });
  }

  selectProduct(id: Number){
    this.router.navigate(['/product', id]).then();

  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }
}


//   (res) => {
//     // let resultantValue:{ count: number, products: any[]} = {...res}
//     // this.products.push(res);
//     // console.log('test', res);
//   }


// (prods : { count: Number, products: any[]}) => {
//   this.products = prods.products;
//   console.log(this.products);
//
// }





