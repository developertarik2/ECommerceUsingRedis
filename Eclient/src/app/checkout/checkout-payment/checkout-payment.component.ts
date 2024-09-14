import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/shared/models/cart';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

declare var Stripe:any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit,OnDestroy {
@Input() checkoutForm:FormGroup;
@ViewChild('cardNumber',{static:true})cardNumberElemnet:ElementRef;
@ViewChild('cardExpiry',{static:true})cardExpiryElemnet:ElementRef;
@ViewChild('cardCvc',{static:true})cardCvcElemnet:ElementRef;

stripe:any;
cardNumber:any;
cardExpiry:any;
cardCvc:any;
cardErrors:any;
cardHandler=this.onChange.bind(this);

  constructor(private cartService:CartService,private checkoutServie:CheckoutService,
              private toastr:ToastrService,private router:Router) { }
  
  
  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange({error}:any){
   if(error){
     this.cardErrors=error.message;
   }
   else{
     this.cardErrors=null;
   }
  }

  ngAfterViewInit() {
    this.stripe= Stripe('pk_test_51Iy8z3Gzwp1dz9Fy3pKialdlkzRQUQkh2Owo1ntY8U3ReXcW7VVmeeXl0fvju2twOekEYMTlsUslanFg0CPKM3Dp00lcjyXJPl');
    const elements= this.stripe.elements();

    this.cardNumber=elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElemnet.nativeElement);
    this.cardNumber.addEventListener('change',this.cardHandler);

    this.cardExpiry=elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElemnet.nativeElement);
    this.cardExpiry.addEventListener('change',this.cardHandler);

    this.cardCvc=elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElemnet.nativeElement);
    this.cardCvc.addEventListener('change',this.cardHandler);
  }

  submitOrder(){
    const cart =this.cartService.getCurrentBasketValue();
    console.log(this.checkoutForm.get('deliveryForm').get('deliveryMethod').value);
    const orderToCreate=this.getOrderToCreate(cart);
    this.checkoutServie.createOrder(orderToCreate).subscribe((order:IOrder) => {
    this.toastr.success('Order created');
    
    this.stripe.confirmCardPayment(cart.clientSecret,{
      payment_method:{
        card:this.cardNumber,
        billing_details:{
          name:this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    }).then((result: any)=>{
      console.log(result);
      if(result.paymentIntent){
        this.cartService.deleteLocalCart(cart.id);
        const navigationExtras:NavigationExtras={state:order};
        this.router.navigate(['checkout/success'],navigationExtras);
      } else {
        this.toastr.error('Payment error');
      }
    })
    
      //const navigationExtras:NavigationExtras={state:order};
      //this.router.navigate(['checkout/success'],navigationExtras);
     // this.cartService.deleteLocalCart(cart.id);
      console.log(order);
    }, error=> {
      this.toastr.error(error.message);
      console.log(error);
    })
  }

  getOrderToCreate(cart: ICart) {
    return {
      cartId: cart.id,
    deliveryMethodId: this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
    shipToAddress: this.checkoutForm.get('addressForm').value
    }
  }

}
