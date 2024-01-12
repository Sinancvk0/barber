import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add/category-add.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, CategoryAddComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = []
  @ViewChild(CategoryAddComponent, { static: true }) categoryAddComponent !: CategoryAddComponent;
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
  // showEditModal(user:User|null){
  //   if(user==null) return;
  //   this.updateUserComponent.createUpdateForm(user);
  // }
  deleteUserById(id: number) {
    this.categoryService.deleteById(id).subscribe(result => {
      this.getList();
    })

  }
}
