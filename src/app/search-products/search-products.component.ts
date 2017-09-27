
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  results: any[] = []; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user
  orderby: string = "id";
  order: string = "desc";

  newProductForm: FormGroup;
  delProductForm: FormGroup;
  editProductForm: FormGroup;

  constructor(private searchService: SearchProductsService) {}
  ngOnInit() {
    this.newProductForm = new FormGroup({
      'id' : new FormControl(null),
      'sku': new FormControl(null, [Validators.required, Validators.minLength(1),]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(1),]),
      'price' : new FormControl(null, [Validators.required, Validators.minLength(1)])  
    });
    this.delProductForm = new FormGroup({
      'id' : new FormControl(null)
    });
    this.editProductForm = new FormGroup({
      'id' : new FormControl(null),
      'sku': new FormControl(null, [Validators.required, Validators.minLength(1),]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(1),]),
      'price' : new FormControl(null, [Validators.required, Validators.minLength(1)])  
    });

    this.searchAll();
  }

  searchAll() {
    this.searchService.getAllProducts().subscribe(
      products => {
        console.log("[searchAll] products: " + products);
        this.results = products;
        this.sort(this.orderby, this.order);
      },
      error => {
        this.results = [];
        this.error_text = "No se han encontrado productos. Inténtelo de nuevo";
        console.error(error);
      }
    )
  }
 
  private newItem(form) {
    this.searchService.newProduct(form.sku, form.name, form.price).subscribe(
      products => {
        console.log("[newItem] products: " + products);

        this.orderby = 'id';
        this.order = 'desc';

        this.newProductForm.setValue({id: null, sku: null, name : null, price: null});

        this.results = products;
        this.sort(this.orderby, this.order);
      },
      error => {
        this.results = [];
        this.error_text = "Error al crear nuevo producto";
        console.error(error);
      }
    );
  }

  private sendIdToModalEdit(id: number, sku: string, name: string, price: number) {
    this.editProductForm.setValue({id: id, sku: sku, name: name, price: price});
  }
  private updateItem(form) {
    this.searchService.updateProduct(form.id, form.sku, form.name, form.price).subscribe(
      products => {
        console.log("[updateItem] products: " + products);
        this.results = products;
        this.sort(this.orderby, this.order);
      },
      error => {
        this.results = [];
        this.error_text = "Error al crear nuevo producto";
        console.error(error);
      }
    );
  }

  private sendIdToModalDelete(id: number) {
    this.delProductForm.setValue({id: id});
  }
  private delItem(id: number) {
    this.searchService.delProduct(id).subscribe(
      products => {
        console.log("[delItem] products: " + products);
        this.results = products;
        this.sort(this.orderby, this.order);
      },
      error => {
        this.results = [];
        this.error_text = "Error al borrar producto";
        console.error(error);
      }
    );
  }

  sort(orderby: string, order: string) {
    if("asc" === order)
      this.sortDesc(orderby);
    else
      this.sortAsc(orderby);

    this.orderby = orderby;
    this.order = order;
  }

  private sortDesc(orderby: string) {
    switch(orderby) {
      case "sku":
        this.results = this.results.sort((n1,n2) => {
          if(n2.sku.toUpperCase() > n1.sku.toUpperCase()) return 1;
          if(n2.sku.toUpperCase() < n1.sku.toUpperCase()) return -1;
          return 0;
        });
        break;
      case "name":
        this.results = this.results.sort((n1,n2) => {
          if(n2.name.toUpperCase() > n1.name.toUpperCase()) return 1;
          if(n2.name.toUpperCase() < n1.name.toUpperCase()) return -1;
          return 0;
        });
        break;
      case "price":
        this.results = this.results.sort((n1,n2) => n2.price - n1.price);
        break;
    }
  }

  private sortAsc(orderby: string) {
    switch(orderby) {
      case "sku":
        this.results = this.results.sort((n1,n2) => {
          if(n2.sku.toUpperCase() < n1.sku.toUpperCase()) return 1;
          if(n2.sku.toUpperCase() > n1.sku.toUpperCase()) return -1;
          return 0;
        });
        break;
      case "name":
      this.results = this.results.sort((n1,n2) => {
        if(n2.name.toUpperCase() < n1.name.toUpperCase()) return 1;
        if(n2.name.toUpperCase() > n1.name.toUpperCase()) return -1;
        return 0;
      });
        break;
      case "price":
        this.results = this.results.sort((n1,n2) => n1.price - n2.price);
        break;
    }
    this.orderby = orderby;
    this.order = "asc";
  }

}