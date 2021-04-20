import { Component, OnInit } from "@angular/core";
import {CartService} from "../../Services/cart.service";
import {OrderService} from "../../Services/order.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {CartModelServer} from "../../models/cart.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  cartData: CartModelServer | any;
  cartTotal: number | any;

  constructor(private cartService: CartService,
              private  orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

  }

  onCheckout() {
    //console.log('start loader')
    this.spinner.show()
    this.cartService.CheckoutFromCart(2);
  }
}
