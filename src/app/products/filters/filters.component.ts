import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-filters',
  templateUrl:'./filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] = [];
categoriesSubscription: Subscription | undefined;
  constructor(private storeService: StoreService){}
 
  onShowCategory(category:string):void{
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe(_categories =>{
      this.categories = _categories
    });
  }
}
