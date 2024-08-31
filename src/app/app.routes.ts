

// import { logoutGuard } from './logout.guard';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BrandsComponent } from './Layout/pages/brands/brands.component';
import { CartComponent } from './Layout/pages/cart/cart.component';
import { CategoriesComponent } from './Layout/pages/categories/categories.component';
import { LoginComponent } from './Layout/pages/login/login.component';
import { RegisterComponent } from './Layout/pages/register/register.component';
import { NotfoundComponent } from './Layout/addition/notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ForgetpasswordComponent } from './Layout/addition/forgetpassword/forgetpassword.component';
import { ProductdetailsComponent } from './Layout/addition/productdetails/productdetails.component';
import { ShoppingcartcashComponent } from './Layout/addition/shoppingcartcash/shoppingcartcash.component';
import { AllordersComponent } from './Layout/addition/allorders/allorders.component';
import { logoutGuard } from './logout.guard';
import { WishlistComponent } from './Layout/pages/wishlist/wishlist.component';
import { Specificbrandcomponent } from './Layout/pages/specificbrand/specificbrand.component';
import { SubcategoryComponent } from './Layout/addition/subcategory/subcategory.component';
import { ProductsComponent } from './Layout/pages/Products/Productscomponent';
import { HomeComponent } from './Layout/pages/home/home.component';




export const routes: Routes = [
    {path:"",redirectTo:'home',pathMatch:'full'},
    {path:"home",component:HomeComponent,canActivate:[authGuard]},
    {path:"brands",component:BrandsComponent,canActivate:[authGuard]},
    {path:"cart",component:CartComponent,canActivate:[authGuard]},
    {path:"categories",component:CategoriesComponent,canActivate:[authGuard]},
    // {path:'setting',loadChildren:()=>import('../app/setting/setting.module').then((c)=>c.SettingModule),canActivate:[authGuard]},
    {path:"products",component:ProductsComponent,canActivate:[authGuard]},
    {path:"login",component:LoginComponent,canActivate:[logoutGuard]},
    {path:"productdetails/:id",component:ProductdetailsComponent,canActivate:[authGuard]},
    {path:"register",component:RegisterComponent,canActivate:[logoutGuard]},
    {path:"forgetpassword",component:ForgetpasswordComponent},
    {path:"Shoppingcartcash/:cartid",component:ShoppingcartcashComponent,canActivate:[authGuard]},
    {path:"allorders",component:AllordersComponent,canActivate:[authGuard]},
    {path:"wishlist",component:WishlistComponent,canActivate:[authGuard]},
    {path:"specificbrand/:brandid",component:Specificbrandcomponent,canActivate:[authGuard]},
    {path:"subcategory/:categoryid",component:SubcategoryComponent,canActivate:[authGuard]},
    {path:'**',component:NotfoundComponent}
];
