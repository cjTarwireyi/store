import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { IRatingModel } from 'src/app/models/rating.model';

@Component({
  selector: 'app-star-rating',
  templateUrl:'./star-rating.component.html',
  styles: [
    `.crop {
      overflow: hidden;
    }
    div {
      cursor: pointer;
    }`
  ]
})
export class StarRatingComponent implements  OnInit {
@Input() product : IProduct | undefined ;
  cropWidth = 75;
  rating= '';
  ratingVotes: IRatingModel | undefined;
  ratingsCollection: IRatingModel[]=[
    {productId:1, one: 100, two: 1, three: 1, four: 1,   five: 1},
    {productId:2, one: 1, two: 55, three: 1, four: 3,   five: 1},
    {productId:3, one: 1, two: 1, three: 0, four: 1,   five: 3},
    {productId:4, one: 4, two: 110, three: 20, four: 1,   five: 200},
    {productId:5, one: 5, two: 0, three: 30, four: 1,   five: 1},
    {productId:6, one: 1, two: 2, three: 3, four: 1,   five: 1},
    {productId:7, one: 1, two: 5, three: 1, four: 3,   five: 1},
    {productId:8, one: 1, two: 10, three: 0, four: 1,   five: 3},
    {productId:9, one: 4, two: 0, three: 20, four: 1,   five: 1},
    {productId:10, one: 5, two: 0, three: 30, four: 1,   five: 1},
    {productId:11, one: 1, two: 2, three: 3, four: 1,   five: 1},
    {productId:12, one: 1, two: 5, three: 1, four: 3,   five: 1},
    {productId:13, one: 1, two: 10, three: 0, four: 1,   five: 3},
    {productId:14, one: 4, two: 0, three: 20, four: 1,   five: 1},
    {productId:15, one: 5, two: 0, three: 30, four: 1,   five: 1},
    {productId:16, one: 1, two: 2, three: 3, four: 1,   five: 1},
    {productId:17, one: 1, two: 5, three: 1, four: 3,   five: 1},
    {productId:18, one: 1, two: 10, three: 0, four: 1,   five: 3},
    {productId:19, one: 4, two: 0, three: 20, four: 1,   five: 1},
    {productId:20, one: 5, two: 0, three: 30, four: 1,   five: 1}]
  
  ngOnInit(): void {
    this.ratingVotes = this.ratingsCollection.find(e => e.productId ==this.product?.id)
    if(this.product!= null){
    let avarageRating = this.calculateAverageRating();
    this.product.votes = this.totalVotesSum();
    this.product.rating = avarageRating.toFixed(1);
    this.product.cropWidth = avarageRating * 75 / 5;}
  }
  onClick():void{

  }
  calculateAverageRating():number{
    if(this.ratingVotes == null){
      return 0;
    }
    return (this.ratingVotes.one * 1 + this.ratingVotes.two * 2 + this.ratingVotes.three * 3 + this.ratingVotes.four * 4 + this.ratingVotes.five * 5)
    /this.totalVotesSum();
  }
  totalVotesSum():number{
    if(this.ratingVotes == null){
      return 0;
    }
    return (this.ratingVotes.one + this.ratingVotes.two  + this.ratingVotes.three  + this.ratingVotes.four  + this.ratingVotes.five );
  }
}
