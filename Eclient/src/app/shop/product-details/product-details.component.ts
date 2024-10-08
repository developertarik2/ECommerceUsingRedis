import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { ICartItem } from 'src/app/shared/models/cart';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product : IProduct;
  quantity=1;

  constructor(private shopService:ShopService,private activateRoute:ActivatedRoute,
    private bcService:BreadcrumbService,private cartService:CartService) { 
      this.bcService.set('@productDetails',' ');
    }

  ngOnInit(): void {
    this.loaProduct();
  }

  loaProduct(){
     this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
       this.product = product;
       this.bcService.set('@productDetails',product.name)
     }, error =>{
       console.log(error);
     }
     );
  }

  addItemToCart(){
  this.cartService.addItemToBasket(this.product,this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1)
    this.quantity--;
  }

}
