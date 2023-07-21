import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../cart/cart.service';
import { StoreService } from '../store/store.service';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-products-details',
  templateUrl:'./products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  cols=3;
  rowHeight= ROWS_HEIGHT[this.cols];
  category:string | undefined;
  products: IProduct[] =[];
  sort ='desc';
  count='5';
  productsSubscription: Subscription | undefined;

  constructor(private cartService :CartService, private storeService :StoreService){}
 
  onColumnsCountChange(colsNumber : number):void{
    this.cols= colsNumber;
    this.rowHeight= ROWS_HEIGHT[colsNumber];
  }

  onItemsCountChange(newCountValue:number):void{
    this.count = newCountValue.toString();
    this.getProducts();
  }

  onSortChange(newSortValue:string): void{
    this.sort = newSortValue;
    this.getProducts();
  }

  onShowCategory(newCategory:string):void{
    this.category = newCategory
    this.getAllProductsByCategory();
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

  getProducts():void{
    this.productsSubscription= this.storeService.getAllProducts(this.count,this.sort)
    .subscribe(_products =>{
      this.products = _products
    })
  }
  getAllProductsByCategory():void{
    this.productsSubscription= this.storeService.getAllProductsByCategory(this.count,this.sort,this.category )
    .subscribe(_products =>{
      this.products = _products
    })
  }
  ngOnInit(): void {
   this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }
}
