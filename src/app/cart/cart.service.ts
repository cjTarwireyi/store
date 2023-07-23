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
      const itemsInCart = items.find(_item => _item.id === item.id);

      if(itemsInCart){
        itemsInCart.quantity +=1;
      }
        else{
          items.push(item);        
      }

      this.cart.next({items});

      this.NotifyUser('1 item added to cart');
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
    this.NotifyUser('Cart is cleared');
  }

  removeItem(item: ICartItem): void{
    const filteredItem = this.cart.value.items.filter(_item => _item.id != item.id);
    this.cart.next({items: filteredItem});
    this.NotifyUser('Item removed from Cart',);
  }

  incrementItemQuantity(item: ICartItem):void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find(_item => item.id === item.id);

    if(itemsInCart)
      itemsInCart.quantity +=1;

        this.cart.next({items});
        this.NotifyUser('One item added to the Cart',);
  }

  decrementItemQuantity(item: ICartItem):void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find(_item => _item.id === item.id);
    
    if(itemsInCart && itemsInCart.quantity> 1){
      itemsInCart.quantity --;
      this.cart.next({items});
      this.NotifyUser('One item removed from the Cart',);
    }      
    else{
      this.removeItem(item);
    }
  }

  checkOut(): void {
     //check out implementation here
  }
  private NotifyUser(message:string):void{
    this._snackBar.open(message, 'Ok', {duration: 3000});
  }
}
