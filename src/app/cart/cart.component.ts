import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from 'src/app/models/cart.model';
import { CartService } from './cart.service';
import { CurrencyService } from '../shared/currency.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
templateUrl:'./cart.component.html'
})
export class CartComponent implements OnInit {
   cart: ICart = {items:[
   ]};

   public payPalConfig ? : IPayPalConfig;
   showCancel =false;
   showError =false;

   currencyCode: string ='';
   dataSource : ICartItem[] =[];
   displayedColumns: string[]=[

    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
   ]
   constructor(private cartService: CartService, private currencyService: CurrencyService){}

   getSubTotal(item:ICartItem):number{
    return this.cartService.getSubTotal(item); 
    }

   getTotal(items:ICartItem[]):number{
   return this.cartService.getTotal(items);
   } 

   ngOnInit():void{
    this.currencyCode = this.currencyService.getCurrencyCode();
    this.cartService.cart.subscribe(_cart => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })   
    this.initConfig();   
   }

  onClearCart():void{
    this.cartService.clearCart();
  }

  onRemoveItem(item: ICartItem): void{
    this.cartService.removeItem(item);
  }

  onIncrementItemQuantity(item: ICartItem):void {
    this.cartService.incrementItemQuantity(item);
  }

  onDecrementItemQuantity(item: ICartItem):void {
    this.cartService.decrementItemQuantity(item);
  }
  onCheckout():void{
    this.cartService.checkOut();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: this.currencyService.getCurrencyCode(),
        clientId:  environment.client_ID,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
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
            //this.showSuccess = true;
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
