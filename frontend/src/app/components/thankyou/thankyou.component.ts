import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../Services/order.service";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  message: string | any;
  orderId: number | any;
  products: ProductResponseModel[] = [];
  cartTotal: number | any;

  constructor(private router: Router,
              private orderService: OrderService) {

    const navigation = this.router.getCurrentNavigation();
    console.log(navigation && navigation.extras.state)
    const state = navigation && navigation.extras.state as {
      message: string,
      products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    this.message = state && state.message;
    this.products = state ? state.products : [];
    this.orderId = state && state.orderId;
    this.cartTotal = state && state.total;


  }

  ngOnInit(): void {
  }

}

interface ProductResponseModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantityOrdered: number;

}
