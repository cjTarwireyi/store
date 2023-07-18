import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl : './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort='desc'
  itemsShowCount: number =5;
  constructor(){}

  onSortUpdated(newSort:string):void{
    this.sort = newSort;
  }

  onItemsUpdated(itemsShowCount:number): void{
    this.itemsShowCount = itemsShowCount;
  }

  onColomnsUpdated(colsNum: number):void{
    this.columnsCountChange.emit(colsNum);
  }
  ngOnInit(): void {   
  }

}
