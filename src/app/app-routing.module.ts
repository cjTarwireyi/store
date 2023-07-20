import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { ProductsDetailsComponent } from "./products/products-details/products-details.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsDetailsComponent },
  { path: "cart", component: CartComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
