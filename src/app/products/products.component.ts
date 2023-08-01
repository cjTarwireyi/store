import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../cart/cart.service';
import { StoreService } from '../store/store.service';
import { EMPTY, Observable, catchError, combineLatest, map } from 'rxjs';
import { IFilter } from '../models/filter.model';

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
  //products$: Observable<IProduct[]> | undefined;
  sort ='desc';
  count='5';
  errorMessage=""; 
  filter :IFilter ={limit:"5", sort:"desc",category:undefined}

  constructor(private cartService :CartService, private storeService :StoreService){}

  products$ = combineLatest({prod:this.storeService.products$, prodCat:this.storeService.productsFilteredByCategory$})
  .pipe(map((products )=>{
      return products.prod.length>0 ? products.prod : products.prodCat;
  }))
  
  // this.storeService.products$.pipe(
  //   catchError(err =>{
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );

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
    let filter :IFilter ={limit:this.count, sort:this.sort,category:this.category}
    this.storeService.filterChanged(filter);
    // this.products$ = this.storeService.getAllProducts(this.count,this.sort)
    // .pipe(
    //   catchError(err => {
    //     this.errorMessage = err;
    //     return EMPTY
    //   })
    // );
  }
  getAllProductsByCategory():void{
    let filter :IFilter ={limit:this.count, sort:this.sort,category:this.category}
    this.storeService.categoryFilterChanged(filter);
  //  let filter :IFilter ={limit:this.count, sort:this.sort,category:this.category}
  //  this.products$ = this.storeService.getAllProductsByCategory(filter)
  //  .pipe(
  //   catchError(err =>{
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  //  )
  }
  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {

  }
}
