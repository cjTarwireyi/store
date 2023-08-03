import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class StarRatingComponent implements OnChanges, OnInit {


  cropWidth = 75;
  rating= 3;
  ratingVotes: IRatingModel ={
    one: 1,
    two: 0,
    three: 0,
    four: 1,
    five: 1
  }
  ngOnChanges(changes: SimpleChanges): void {
     this.cropWidth = this.rating * 75 / 5;
  }
  ngOnInit(): void {
    this.cropWidth = this.calculateAverageRating() * 75 / 5;
  }
  onClick():void{

  }
  calculateAverageRating():number{
    return (this.ratingVotes.one * 1 + this.ratingVotes.two * 2 + this.ratingVotes.three * 3 + this.ratingVotes.four * 4 + this.ratingVotes.five * 5)
    /(this.ratingVotes.one + this.ratingVotes.two  + this.ratingVotes.three  + this.ratingVotes.four  + this.ratingVotes.five )
  }
}
