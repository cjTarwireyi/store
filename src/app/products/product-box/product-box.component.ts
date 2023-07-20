import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<IProduct>();
  product: IProduct ={
    id:1,
    title:'Snikers',
    price:150,
    category:'shoes',
    description:'Size 9, male',
    image:'https://via.placeholder.com/150'
  };
  constructor(){}

  onAddToCart(): void{
    this.addToCart.emit(this.product);
  }
}
