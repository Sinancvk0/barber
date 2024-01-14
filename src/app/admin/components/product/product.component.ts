import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ProductUpdateComponent,ProductAddComponent,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products:Product[]=[]
  selectedProduct!:Product
  @ViewChild(ProductAddComponent,{static:true}) addProductComponent !: ProductAddComponent; 
  @ViewChild(ProductUpdateComponent,{static:true}) updateProductComponent !: ProductUpdateComponent; 
  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.productService.getAll().subscribe(result=>{
      this.products=result.data;
    });
  }
  showAddModal(){
    this.addProductComponent.createCreateForm();
  }
  showEditModal(product:Product|null){
    if(product==null) return;
    this.updateProductComponent.createUpdateForm(product);
  }
  deleteProductById(id:number){
    this.productService.deleteById(id).subscribe(result=>{
      this.getList();
    })
  }
}
