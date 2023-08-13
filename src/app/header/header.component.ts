import { Component, Input, OnInit } from '@angular/core';
import { ICart, ICartItem } from '../models/cart.model';
import { CartService } from '../cart/cart.service';
import { CurrencyService } from '../shared/currency.service';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  private _cart: ICart = {items: []};
  itemsQuantity = 1 ;
  currencyCode: string ='';
  menuItems: HTMLElement | null = null
  smallScreenMenuIsVisible = false;
  @Input()
  get cart(): ICart{
    return this._cart;
  }

  set cart(cart: ICart){
    this._cart = cart;
    this.itemsQuantity = cart.items.map(item => item.quantity)
    .reduce((prev, current)=> prev+ current,0);
  }

  constructor(private cartService: CartService, private currencyService: CurrencyService){
    
  }
 
  getTtotal():number{
    return this.cartService.getTotal(this.cart.items);
  }

  getSubTotal(item:ICartItem):number{
    return this.cartService.getSubTotal(item); 
    }

  onClearCart():void{
    this.cartService.clearCart();
  }

  menuToggle(): void{
    
   if(this.menuItems ){   
    if(this.menuItems.style.maxHeight =="0px"){
      this.menuItems.style.maxHeight = "200px";
      this.smallScreenMenuIsVisible = true
      return;
    }
      this.menuItems.style.maxHeight = "0px"; 
      this.smallScreenMenuIsVisible = false  
   } 
  }

  ngOnInit(): void {
    this.currencyCode = this.currencyService.getCurrencyCode();
    this.menuItems = document.getElementById("menuItems");

    if(this.menuItems)
    this.menuItems.style.maxHeight = this.menuItems.style.maxHeight="0px"; 
    
  }
}
