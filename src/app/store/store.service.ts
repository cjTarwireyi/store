import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
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
        tap(products => console.log("Products: ", JSON.stringify(products))),
        catchError(this.handleError)
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
    return this.httpClient.get<string[]>( `${STORE_BASE_URL}/products/categories`)
    .pipe(
      catchError(this.handleError)
    );
     }
    
  getProductsPriceInfo():void{
    // http://localhost:4242/products
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
