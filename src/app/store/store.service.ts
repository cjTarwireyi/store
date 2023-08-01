import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, switchMap, tap, throwError } from 'rxjs';
import { IProduct } from '../models/product.model';
import { IFilter } from '../models/filter.model';
const STORE_BASE_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private  filter :IFilter ={limit:"5", sort:"desc",category:undefined}
  private filterSubject = new BehaviorSubject<IFilter>(this.filter);
  private categoryFilterSubject = new BehaviorSubject<IFilter>(this.filter);  

  filterAction$ = this.filterSubject.asObservable();
  categoryFilterAction$ = this.categoryFilterSubject.asObservable();

  products$ = this.filterAction$.pipe(
    switchMap(filter => this.httpClient.get<IProduct[]>(`${STORE_BASE_URL}/products?sort=${filter.sort}&limit=${filter.limit}`)
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )));

    productsFilteredByCategory$ = this.categoryFilterAction$.pipe(
      switchMap(filter => this.httpClient.get<IProduct[]>( `${STORE_BASE_URL}/products/category/${filter.category}?sort=${filter.sort}&limit=${filter.limit}`)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      )));

  constructor(private httpClient : HttpClient) { }

  filterChanged(filter:IFilter):void{
    this.filterSubject.next(filter);
  }

  categoryFilterChanged(filter:IFilter):void{
    this.categoryFilterSubject.next(filter);
  }

  getAllProductsByCategory(fiter:IFilter): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(
      `${STORE_BASE_URL}/products/category/${fiter.category}?sort=${fiter.sort}&limit=${fiter.limit}`)
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
