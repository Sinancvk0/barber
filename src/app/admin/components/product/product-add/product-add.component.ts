import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../../models/category';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { Product } from '../../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent{
  categories:Category[]=[]
  createForm!:FormGroup
  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private productService:ProductService,
    private categoryService:CategoryService){}
  getCategoryList(){
    this.categoryService.getAll().subscribe(result=>{
      this.categories=result.data
    })
  }
  createCreateForm(){
    this.getCategoryList();
    this.createForm=this.formBuilder.group({
      categoryId:['',Validators.required],
      name:['',Validators.required],
      description:['',Validators.required],
      tags:['',Validators.required],
      price:['',Validators.required],
      isActive:['',Validators.required],
    })
  }
  onSubmit(){
    if(!this.createForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }
    let product:Product=Object.assign({},this.createForm.value);
    this.productService.create(product).subscribe(result=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }

}
