
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchProductsService {

  private searchProductsEndPoint = "http://localhost:8000/api/v1/";

  constructor(private http: Http) { }

  getAllProducts() {
    let url;

    url = `${this.searchProductsEndPoint}product`;

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  newProduct(sku: string, name: string, price: string) {
    let url = `${this.searchProductsEndPoint}product?sku=${sku}&name=${name}&price=${price}`;
    let body = ``;

    return this.http.post(url,body)
    .map(this.extractData)
    .catch(this.handleError);
  }

  updateProduct(id: number, sku: string, name: string, price: string) {
    let url = `${this.searchProductsEndPoint}product/update?id=${id}&sku=${sku}&name=${name}&price=${price}`;
    let body = ``;

    return this.http.post(url,body)
    .map(this.extractData)
    .catch(this.handleError);
  }

  delProduct(id: number) {
    let url = `${this.searchProductsEndPoint}product/delete?id=${id}`;
    let body = ``;

    return this.http.post(url,body)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.items || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}