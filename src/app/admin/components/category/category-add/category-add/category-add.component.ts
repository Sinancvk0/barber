import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../../services/category.service';
import { Category } from '../../../../../models/category';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
createForm!:FormGroup
@Output() onLoad:EventEmitter<unknown>=new EventEmitter();

constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private categoryService:CategoryService){}

createCreateForm(){
  this.createForm=this.formBuilder.group({
    name:['']
  })
}
onSubmit(){
  if(!this.createForm.valid){
    this.toastrService.warning("please check the form.","warning")
  }
  let category:Category=Object.assign(this.createForm.value);
  this.categoryService.create(category).subscribe(result=>{
    if(typeof document ==undefined) return;
    document.querySelector(".create-modal")?.classList.toggle("show");
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    this.onLoad.emit();
  })
}
}

