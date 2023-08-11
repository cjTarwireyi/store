import { Component } from '@angular/core';
import { IProduct } from '../models/product.model';

@Component({
  selector: 'app-featured-products',
  templateUrl:'./featured-products.html',
  styleUrls:['./featured-products.css']
})
export class FeaturedProductsComponent {
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
