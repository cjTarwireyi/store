import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTreeModule } from "@angular/material/tree";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ProductsHeaderComponent } from "./products/products-header/products-header.component";
import { FiltersComponent } from "./products/filters/filters.component";
import { ProductBoxComponent } from "./products/product-box/product-box.component";
import { CartComponent } from "./cart/cart.component";
import { ProductsComponent } from "./products/products.component";
import {  HttpClientModule } from "@angular/common/http";
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { NgxPayPalModule } from "ngx-paypal";
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { FeaturedCategoriesComponent } from './featured-categories/featured-categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    ProductsComponent,
    StarRatingComponent,
    ReviewListComponent,
    PaymentSuccessComponent,
    PaymentOptionsComponent,
    FeaturedCategoriesComponent,
    FeaturedProductsComponent,
    TestimonialComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTreeModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
