import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

import {ProductModelServer} from "../../models/product.model";
import {map} from "rxjs/operators";
import {ProductService} from "../../Services/product.service";
import { CartService } from 'src/app/Services/cart.service';


declare let $: any;

@Component({
  selector: 'mg-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit, OnInit {

  id: Number | any;
  product: any={};
  styled=false;
  thumbImages: any[] = [];


  @ViewChild('quantity')  quantityInput : any;

  // @ts-ignore
  private styleInterval: any;
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) {


  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        console.log(prod)
        if (prod.images !== null) {
          this.thumbImages = prod.images.split(';');
        }
        // this.styleFunction();
      });
    });
  }

  ngAfterViewInit(): void{
    this.styleInterval = setInterval(()=>{
      if(Object.keys(this.product).length>0){
        this.styleFunction()
        this.clearInterval()
      }
    }, 500);
  }

  private clearInterval() {
    clearInterval(this.styleInterval)
  }

  styleFunction(): void {
    console.log("styled -> ",Object.keys(this.product));
    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    let zoomMainProduct = document.getElementById('product-main-img');
    console.log(zoomMainProduct)
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  addToCart(id: any) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 1) {
        // @ts-ignore
        value = 1;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}
