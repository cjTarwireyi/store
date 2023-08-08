import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CurrencyService } from '../shared/currency.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ICart, ICartItem } from '../models/cart.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-payment-options',
templateUrl:'./payment-options.component.html'
})
export class PaymentOptionsComponent implements OnInit{

  cart: ICart = {items:[]};
  public payPalConfig ? : IPayPalConfig;
  showCancel =false;
  showError =false;

  constructor(private cartService: CartService, private currencyService: CurrencyService, private router: Router){}

  ngOnInit(): void {
    this.cartService.cart.subscribe(_cart =>{
      this.cart = _cart;
    })
    this.initConfig();
  }

  getTotal(items:ICartItem[]):number{
    return this.cartService.getTotal(items);
  } 
  payWithStripe(){
     this.cartService.payWithStripe();
  }
    
  private initConfig(): void {
    this.payPalConfig = {
        currency: this.currencyService.getCurrencyCode(),
        clientId:  environment.client_ID,
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: this.currencyService.getCurrencyCode(),
                    value: `${this.getTotal(this.cart.items)}` ,
                    breakdown: {
                        item_total: {
                            currency_code: this.currencyService.getCurrencyCode(),
                            value: `${this.getTotal(this.cart.items)}`
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code:this.currencyService.getCurrencyCode(),
                        value: `${this.getTotal(this.cart.items)}`,
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            // actions.order.get().then(details => {
            //     console.log('onApprove - you can get full order details inside onApprove: ', details);
            // });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.router.navigate(['/paymentSuccess'])
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        }
    };
}
}
