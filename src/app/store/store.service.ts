import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
const STORE_BASE_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient : HttpClient) { }

  getAllProducts(limit='12', sort = 'desc'): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`);
  } 
  getAllProductsByCategory(limit='12', sort = 'desc', category? : string): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(
      `${STORE_BASE_URL}/products/category/${category}?sort=${sort}&limit=${limit}`);
  }
  getAllCategories(): Observable<string[]>{
    return this.httpClient.get<string[]>( `${STORE_BASE_URL}/products/categories`);
     }
}
