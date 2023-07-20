import { Component } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../cart/cart.service';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-products-details',
  templateUrl:'./products.component.html'
})
export class ProductsComponent {
  cols=3;
  rowHeight= ROWS_HEIGHT[this.cols];
  category:string | undefined;
  constructor(private cartService :CartService){}
  
  onColumnsCountChange(colsNumber : number):void{
    this.cols= colsNumber;
    this.rowHeight= ROWS_HEIGHT[colsNumber];
  }

  onShowCategory(newCategory:string):void{
    this.category = newCategory
  }
  onAddToCart(product:IProduct):void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
}
