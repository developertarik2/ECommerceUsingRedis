import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
// baseUrl= 'https://localhost:5001/api/';
baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts(shopParams:ShopParams) {

    let params = new HttpParams();

    if(shopParams.brandId!=0){
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.typeId!=0){
      params = params.append('typeId',shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }
   // if(shopParams.sort){
      params=params.append('sort',shopParams.sort);
  //  }

    params = params.append('pageIndex',  shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());
    
    return this.http.get<IPagination>(this.baseUrl+ 'products' ,{observe: 'response', params})
    .pipe(
      //delay(1000),
      map(response=> {
        return response.body;
      })
    );
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl+ 'products/'+id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl+ 'products/brands');
  }
  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl+ 'products/types');
  }
}
