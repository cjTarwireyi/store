import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cart, ICartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
templateUrl:'./cart.component.html'
})
export class CartComponent implements OnInit {
   cart: Cart = {items:[
    {
      product:'https://via.placeholder.com/150',
      name:'Snickers',
      price:130,
      quantity:2,
      id:1
    },
    {
      product:'https://via.placeholder.com/150',
      name:'T-shirt',
      price:100,
      quantity:1,
      id:2
    }
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
   getSubTotal(item:ICartItem):number{
    return item.price * item.quantity;   
    }
   getTotal(items:ICartItem[]):number{
   return items
    .map(item => item.price * item.quantity)
    .reduce((previousItem, currentItem)=> previousItem +currentItem,0);   
   }
   ngOnInit():void{
      this.dataSource = this.cart.items;
   }
}
