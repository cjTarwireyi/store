import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProduct } from '../models/product.model';
const STORE_BASE_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient : HttpClient) { }

  getAllProducts(limit='12', sort = 'desc'): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`)
      .pipe(
        tap(products => console.log("Products: ", JSON.stringify(products)))
      );
  } 
  getAllProductsByCategory(limit='12', sort = 'desc', category? : string): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(
      `${STORE_BASE_URL}/products/category/${category}?sort=${sort}&limit=${limit}`)
      .pipe(
        tap(data => console.log('products: ', JSON.stringify(data)))
      );
  }
  getAllCategories(): Observable<string[]>{
    return this.httpClient.get<string[]>( `${STORE_BASE_URL}/products/categories`);
     }
    
  getProductsPriceInfo():void{
    // http://localhost:4242/products
  }
}
