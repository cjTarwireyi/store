import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from 'src/app/models/cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
templateUrl:'./cart.component.html'
})
export class CartComponent implements OnInit {
   cart: ICart = {items:[
   ]};

   dataSource : ICartItem[] =[];
   displayedColumns: string[]=[

    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
   ]
   constructor(private cartService: CartService){}
   getSubTotal(item:ICartItem):number{
    return this.cartService.getSubTotal(item); 
    }

   getTotal(items:ICartItem[]):number{
   return this.cartService.getTotal(items);
   } 

   ngOnInit():void{
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
}
