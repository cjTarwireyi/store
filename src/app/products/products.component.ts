import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../cart/cart.service';
import { StoreService } from '../store/store.service';
import { EMPTY, catchError, combineLatest, map, takeUntil } from 'rxjs';
import { IFilter } from '../models/filter.model';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-products-details',
  templateUrl:'./products.component.html',
  styleUrls:['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {

  cols = 3;
  rowHeight= ROWS_HEIGHT[this.cols];
  category:string | undefined;
  sort ='desc';
  count='20';
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
  onResize(event:any) {
    if(event.target.innerWidth <= 1037){
      this.cols = 1;
    }else{
      this.cols = 3;
    }    
  }
  ngOnDestroy(): void {
 
  }
  product : IProduct ={
    id: 4,
    title: "Canon EOS 400D",
    image: "assets/dom-hill-nimElTcTNyY-unsplash.jpg",
    description:"It is the successor of the Canon EOS 350D, and upgrades to a 10.1 megapixel CMOS sensor, a larger continuous shooting buffer, an integrated image sensor vibrating cleaning system (first used in a Canon EOS DSLR), a more precise nine-point autofocus system from the EOS 30D, improved grip, and a bigger 2.5-inch (64 mm) LCD with 230,000 pixels and a larger viewing angle which replaces the top status screen.",
    price: 19.99,
    category:"",
    cropWidth:60,
    rating:"5",
    votes:100
  } ;
}
