import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../../services/category.service';
import { Category } from '../../../../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {
 updateFrom!:FormGroup
 @Output() onLoad:EventEmitter<unknown>=new EventEmitter();


  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService, private categoryService:CategoryService){}

  createUpdateForm(category:Category){
    this.updateFrom=this.formBuilder.group({
      name:[category.name,Validators.required]
    })
  }
  onSubmit(){
    if(!this.updateFrom.valid){
      this.toastrService.warning("Please check the form","Warning");
      return;

    }
    let categoryUpdate:Category=Object.assign(this.updateFrom.value);
    this.categoryService.update(categoryUpdate).subscribe(res=>{
      if(typeof document ==undefined)return;
      document.querySelector(".edit-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
}
