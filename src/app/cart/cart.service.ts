import { Injectable } from "@angular/core";
import { ICart, ICartItem } from "../models/cart.model";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<ICart>({ items: [] });
  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) {}

  addToCart(item: ICartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);

    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });

    this.NotifyUser("1 item added to cart");
    console.log(this.cart.value);
  }

  getTotal(items: ICartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((previousItem, currentItem) => previousItem + currentItem, 0);
  }

  getSubTotal(item: ICartItem): number {
    return item.price * item.quantity;
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.NotifyUser("Cart is cleared");
  }

  removeItem(item: ICartItem): void {
    const filteredItem = this.cart.value.items.filter(
      (_item) => _item.id != item.id
    );
    this.cart.next({ items: filteredItem });
    this.NotifyUser("Item removed from Cart");
  }

  incrementItemQuantity(item: ICartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => item.id === item.id);

    if (itemsInCart) itemsInCart.quantity += 1;

    this.cart.next({ items });
    this.NotifyUser("One item added to the Cart");
  }

  decrementItemQuantity(item: ICartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);

    if (itemsInCart && itemsInCart.quantity > 1) {
      itemsInCart.quantity--;
      this.cart.next({ items });
      this.NotifyUser("One item removed from the Cart");
    } else {
      this.removeItem(item);
    }
  }

  checkOut(): void {
    this.httpClient
      .post("https://store-checkout.onrender.com/checkout", {
        items: this.cart.value.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51NXLNCAQcbnrGaFb55FKGImN4fjxFXzvy02rWY4f0huawDgG9P7SIhbNLhT0cQ3EQMvTNlRmcQS46ejoVgPrMr8D00hnuRidUg"
        );
        stripe?.redirectToCheckout({
          sessionId: res,
        });
      });
  }
  private NotifyUser(message: string): void {
    this._snackBar.open(message, "Ok", { duration: 3000 });
  }
}
