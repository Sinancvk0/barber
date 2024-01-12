import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add/category-add.component';
import { CategoryUpdateComponent } from './category-update/category-update/category-update.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, CategoryAddComponent,CategoryUpdateComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  [x: string]: any;
  categories: Category[] = []
  @ViewChild(CategoryAddComponent, { static: true }) categoryAddComponent !: CategoryAddComponent;
  @ViewChild(CategoryUpdateComponent, { static: true }) categoryUpdateComponent !: CategoryUpdateComponent;
  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.categoryService.getAll().subscribe(result => {
      this.categories = result.data;
    });
  }
  showAddModal() {
    this.categoryAddComponent.createCreateForm();
  }
  showEditModal(category:Category|null){
    if(category==null) return;
    this.categoryUpdateComponent.createUpdateForm(category);
  }
  deleteUserById(id: number) {
    this.categoryService.deleteById(id).subscribe(result => {
      this.getList();
    })

  }
}
