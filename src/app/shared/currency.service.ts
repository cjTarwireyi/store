import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }
  getCurrencyCode():string{
    return 'ZAR'
  }
}