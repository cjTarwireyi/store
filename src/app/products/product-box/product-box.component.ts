import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { CurrencyService } from 'src/app/shared/currency.service';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product:IProduct | undefined;
  @Output() addToCart = new EventEmitter<IProduct>();
  currencyCode:string ='';
  
  constructor(private currencyService: CurrencyService){}
  
  ngOnInit(): void {
    this.currencyCode = this.currencyService.getCurrencyCode();
  }

  onAddToCart(): void{
    this.addToCart.emit(this.product);
  }
}
