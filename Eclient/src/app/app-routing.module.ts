import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'test-error',component:TestErrorComponent,data:{breadcrumb:'Test Error'}},
  {path:'server-error',component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  {path:'not-found',component:NotFoundComponent,data:{breadcrumb:'Not found'}},
  {path:'shop',loadChildren:() => import('./shop/shop.module').then(mod=>mod.ShopModule),data:{breadcrumb:'Shop'}},
  {path:'cart',loadChildren:() => import('./cart/cart.module').then(mod=>mod.CartModule),data:{breadcrumb:'Cart'}},
  {path:'checkout',canActivate:[AuthGuard], loadChildren:() => import('./checkout/checkout.module').then(mod=>mod.CheckoutModule),data:{breadcrumb:'Checkout'}},
  {path: 'orders', canActivate: [AuthGuard], loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
  data: {breadcrumb: 'Orders'}},
  {path:'account',loadChildren:() => import('./account/account.module').then(mod=>mod.AccountModule),data:{breadcrumb:{skip:true}}},
 // {path:'shop/:id',component:ProductDetailsComponent},
  {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
