import { Component, OnInit } from '@angular/core';
import { ICart } from './models/cart.model';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'store';
  cart: ICart = {items:[]};

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cart.subscribe(_cart =>{
      this.cart = _cart;
    })
  }
}
