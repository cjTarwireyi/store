import { Injectable } from '@angular/core';
import { ICart, ICartItem } from '../models/cart.model';
import {BehaviorSubject} from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<ICart>({items:[]});
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item:ICartItem): void {
      const items = [...this.cart.value.items];
      const itemsInCart = items.find(_item => item.id === item.id);

      if(itemsInCart){
        itemsInCart.quantity +=1;
      }
        else{
          items.push(item);        
      }

      this.cart.next({items});

      this._snackBar.open('1 item added to cart', 'Ok', {duration: 3000});
      console.log(this.cart.value);
  }

  getTotal(items:ICartItem[]):number{
    return items
     .map(item => item.price * item.quantity)
     .reduce((previousItem, currentItem)=> previousItem +currentItem,0);   
  }

    getSubTotal(item:ICartItem):number{
  return item.price * item.quantity;   
  }
    
  clearCart():void{
     this.cart.next({items:[]});
    this._snackBar.open('Cart is cleared', 'Ok', {duration: 3000});
  }

  removeItem(item:ICartItem): void{
    const filteredItem = this.cart.value.items.filter(item => item.id != item.id);
    this.cart.next({items: filteredItem});
    this._snackBar.open('Item removed from Cart', 'Ok', {duration: 3000});
  }

  onIncrementItemQuantity(item: ICartItem):void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find(_item => item.id === item.id);

    if(itemsInCart)
      itemsInCart.quantity +=1;

        this.cart.next({items});
  }

  onDecrementItemQuantity(item: ICartItem):void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find(_item => item.id === item.id);
    
    if(itemsInCart && itemsInCart.quantity> 1){
      itemsInCart.quantity -=1;
      this.cart.next({items});
    }      
    else{
      this.removeItem(item);
    }
  }
}
