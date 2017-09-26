
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  place: string;
  language: string;

  results: any[] = []; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  newProductForm: FormGroup;
  delProductForm: FormGroup;
  editProductForm: FormGroup;

  constructor(private searchService: SearchProductsService) {}
  ngOnInit() {
    this.newProductForm = new FormGroup({
      'id' : new FormControl(null),
      'sku': new FormControl(null, [Validators.required, Validators.minLength(2),]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(2),]),
      'price' : new FormControl(null, [Validators.required, Validators.min(0)])  
    });
    this.delProductForm = new FormGroup({
      'id' : new FormControl(null)
    });
    this.editProductForm = this.newProductForm;

    this.searchAll();
  }

  /* RK */
  searchAll() {
    this.searchService.getAllProducts().subscribe(
      products => {
        this.results = products;
      },
      error => {
        this.results = [];
        this.error_text = "No se han encontrado productos. Inténtelo de nuevo";
        console.error(error);
      }
    )
  }
  private kakakulo() {
    this.searchAllOrderBy('sku', 'desc');
  }
  searchAllOrderBy(orderby:string, order: string) {
    this.searchService.getAllProductsOrderBy(orderby, order).subscribe(
      products => {
        this.results = products;
      },
      error => {
        this.results = [];
        this.error_text = "No se han encontrado productos. Inténtelo de nuevo";
        console.error(error);
      }
    )
  }

  /* RK */
  addProduct(post) { 
    console.log(post); 
  }

  /* RK */
  private newItem(form) {
    this.searchService.newProduct(form.sku, form.name, form.price).subscribe(
      products => {
        console.log(products);
        // this.results = products;
      },
      error => {
        this.results = [];
        this.error_text = "Error al crear nuevo producto";
        console.error(error);
      }
    );
    this.searchAll();
  }

  /* RK */
  private sendIdToModalEdit(id: number, sku: string, name: string, price: number) {
    this.editProductForm.setValue({id: id, sku: sku, name: name, price: price});
  }
  private updateItem(form) {
    this.searchService.updateProduct(form.id, form.sku, form.name, form.price).subscribe(
      products => {
        console.log(products);
        // this.results = products;
      },
      error => {
        this.results = [];
        this.error_text = "Error al crear nuevo producto";
        console.error(error);
      }
    );
    this.searchAll();
  }

  /* RK */
  private sendIdToModalDelete(id: number) {
    this.delProductForm.setValue({id: id});
  }
  private delItem(id: number) {
    this.searchService.delProduct(id).subscribe(
      products => {
        console.log(products);
        this.results = products;
      },
      error => {
        this.results = [];
        this.error_text = "Error al borrar producto";
        // console.error(error);
      }
    );
    this.searchAll();
  }
  
  
  search(place: string, language: string) {
    this.selected = false;
    this.error_text = "";
    if (place || language) {
      this.place = place;
      this.language = language;
      this.searchService.getUsersByPlaceAndLanguage(place, language).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
      )
    }
  }

  getDetails(username: string) {
    this.searchService.getDetailsByUserName(username).subscribe(
      userDatils => {
        this.selectedUser = userDatils;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    )
}
}