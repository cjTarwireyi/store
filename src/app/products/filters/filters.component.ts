import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';

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
  @ViewChild('matRef') matRef: MatSelectionList | undefined;

  clear() {
    this.matRef?.options.forEach((data: MatListOption) => data.selected =false);
    this.showCategory.emit("");
  }
  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe(_categories =>{
      this.categories = _categories
    });
  }
}
