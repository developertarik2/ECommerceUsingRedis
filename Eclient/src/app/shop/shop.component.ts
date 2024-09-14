//import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent,Observable,observable} from 'rxjs';
import { debounceTime,map, startWith } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { ICategory } from '../shared/models/category';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
@ViewChild('search',{static:false}) searchTerm: ElementRef;

products: IProduct[];
brands: IBrand[];
categories: ICategory[];
shopParams = new ShopParams();
totalCount:number;
//brandIdSelected = 0;
//typeIdSelected=0;
//sortSelected='name';
sortOptions=[
 {name:'Alphabetical', value:'name'},
 {name:'Price: Low to High', value:'priceAsc'},
 {name:'Price: High to Low', value:'priceDesc'}
];


isCollapsed = true;
isCollapseCat=true;
showHide=false;
//isScreenSmall$;

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getCategories();

      // Checks if screen size is less than 1024 pixels
 // const checkScreenSize = () => document.body.offsetWidth < 1024;
 // const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500), map(checkScreenSize));; 

  // Create observable from window resize event throttled so only fires every 500ms
  //const screenSizeChanged$ = Observable.fromEvent(window, 'resize').throttleTime(500).map(checkScreenSize);

  // Start off with the initial value use the isScreenSmall$ | async in the
  // view to get both the original value and the new value after resize.
  //this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()))


      if (window.screen.width < 560) { // 768px portrait
        this.isCollapsed = false;
        this.isCollapseCat=false;
        this.showHide=true;
      }
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe( response => {
      this.products = response.data;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
      this.totalCount=response.count;
    }, error=>{
      console.log(error);
    }
      );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response=>{
      this.brands= [{id:0, name: 'All'},...response];
    }, error=>{
      console.log(error);
    }
      );
  }

  getCategories() {
    this.shopService.getCategories().subscribe(response=>{
      this.categories=[{id:0, name: 'All'},...response];
    }, error=>{
      console.log(error);
    }
      );
  }
  OnBrandIdSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  OnTypeIdSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  OnSortSelected(sort: string){
   // const value = event.target.value;
    this.shopParams.sort=sort;
    this.getProducts();
  }

  OnPageChange(event:any){
    if(this.shopParams.pageNumber!=event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  
  }

  onSearch(){
    this.shopParams.search= this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
