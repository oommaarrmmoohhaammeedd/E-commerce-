import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { blankGuard } from './core/guards/blank.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, canActivate: [blankGuard], children: [
            { path: "", redirectTo: "login", pathMatch: 'full' },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "forgot", component: ForgotPasswordComponent },
        ]
    },
    {
        path: "", component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: "", redirectTo: "home", pathMatch: 'full' },
            { path: "home", component: HomeComponent, title: "home" },
            { path: "cart", loadComponent: ()=> import('./components/cart/cart.component').then(c => c.CartComponent) },
            { path: "product", loadComponent: ()=> import('./components/product/product.component').then(c => c.ProductComponent) },
            { path: "brands", loadComponent: ()=> import('./components/brands/brands.component').then(c =>c.BrandsComponent ) },
            { path: "categories", loadComponent: ()=> import('./components/categories/categories.component').then(c => c.CategoriesComponent)},
            { path: "details/:id", component: DetailsComponent, title: "details" },
            { path: "categoriesdetails/:id", loadComponent: ()=> import('./components/categoriesdetails/categoriesdetails.component').then(c => c.CategoriesdetailsComponent) },
            { path: "allorders",  loadComponent: ()=> import('./components/allorders/allorders.component').then(c => c.AllordersComponent) },
            { path: "wish",  loadComponent: ()=> import('./components/wishlist/wishlist.component').then(c => c.WishlistComponent) },
            { path: "orders/:id", loadComponent: ()=> import('./components/orders/orders.component').then(c => c.OrdersComponent) }
        ]
    },
    { path: "**", loadComponent: ()=> import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) },
];