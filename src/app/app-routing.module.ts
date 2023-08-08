import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { PaymentSuccessComponent } from "./payment-success/payment-success.component";
import { PaymentOptionsComponent } from "./payment-options/payment-options.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "paymentSuccess", component: PaymentSuccessComponent},
  { path: "payment", component: PaymentOptionsComponent},
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
