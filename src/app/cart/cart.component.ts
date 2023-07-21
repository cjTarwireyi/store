import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from 'src/app/models/cart.model';
import { CartService } from './cart.service';
import { CurrencyService } from '../shared/currency.service';

@Component({
  selector: 'app-cart',
templateUrl:'./cart.component.html'
})
export class CartComponent implements OnInit {
   cart: ICart = {items:[
   ]};
   currencyCode: string ='';
   dataSource : ICartItem[] =[];
   displayedColumns: string[]=[

    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
   ]
   constructor(private cartService: CartService, private currencyService: CurrencyService){}

   getSubTotal(item:ICartItem):number{
    return this.cartService.getSubTotal(item); 
    }

   getTotal(items:ICartItem[]):number{
   return this.cartService.getTotal(items);
   } 

   ngOnInit():void{
    this.currencyCode = this.currencyService.getCurrencyCode();
    this.cartService.cart.subscribe(_cart => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })      
   }

  onClearCart():void{
    this.cartService.clearCart();
  }

  onRemoveItem(item: ICartItem): void{
    this.cartService.removeItem(item);
  }

  onIncrementItemQuantity(item: ICartItem):void {
    this.cartService.onIncrementItemQuantity(item);
  }

  onDecrementItemQuantity(item: ICartItem):void {
    this.cartService.onDecrementItemQuantity(item);
  }
}