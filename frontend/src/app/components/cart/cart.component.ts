import { Component, OnInit } from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer | any;
  cartTotal: number | any;
  subTotal: number | any;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data: CartModelServer) => this.cartData = data);
    this.cartService.cartTotal$.subscribe((total: any) => this.cartTotal = total);

  }

  ChangeQuantity(index: number, increase: boolean) {
    this.cartService.UpdateCartItems(index, increase);
  }
}
