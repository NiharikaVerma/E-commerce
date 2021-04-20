import { Component, OnInit } from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import {CartService} from "../../Services/cart.service";
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer | any;
  cartTotal: number | any ;
  authState: Boolean | any;

  constructor(public cartService: CartService,
              private userService: UserService) { }

  ngOnInit(): void {

    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.userService.authState$.subscribe(authState => this.authState = authState);

  }

}
