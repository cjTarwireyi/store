import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../cart/cart.service';
import { StoreService } from '../store/store.service';
import { EMPTY, catchError, combineLatest, map } from 'rxjs';
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
  sort ='desc';
  count='5';
  errorMessage=""; 
  filter :IFilter ={limit:"5", sort:"desc",category:undefined}
  loadByCategory = false;

  constructor(private cartService :CartService, private storeService :StoreService){}

  products$ = combineLatest({prod:this.storeService.products$, prodCat:this.storeService.productsFilteredByCategory$})
 // products$ = combineLatest({prod:this.storeService.products$, prodCat:this.storeService.products$})
  .pipe(map((products )=>{
      return this.loadByCategory ? products.prodCat: products.prod;
  }),
  catchError(err =>{
    this.errorMessage = err;
    return EMPTY
  }))

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
    this.getProducts();
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
    if(this.category){
      this.loadByCategory=true;
      this.storeService.categoryFilterChanged(filter);
      return;
    }
    this.loadByCategory=false;
    this.storeService.filterChanged(filter);
  }
  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {

  }
}
