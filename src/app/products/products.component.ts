import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../cart/cart.service';
import { StoreService } from '../store/store.service';
import { EMPTY, Observable, catchError } from 'rxjs';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-products-details',
  templateUrl:'./products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
  cols=3;
  rowHeight= ROWS_HEIGHT[this.cols];
  category:string | undefined;
  products$: Observable<IProduct[]> | undefined;
  sort ='desc';
  count='5';
  errorMessage=""; 

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
    this.products$ = this.storeService.getAllProducts(this.count,this.sort)
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY
      })
    );
  }
  getAllProductsByCategory():void{
   this.products$ = this.storeService.getAllProductsByCategory(this.count,this.sort,this.category )
  }
  ngOnInit(): void {
   this.getProducts();
  }

  ngOnDestroy(): void {

  }
}
