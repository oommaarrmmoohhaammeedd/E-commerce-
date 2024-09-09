import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _CategoriesService = inject(CategoriesService)
  categoreisList: Icategories[] = []
  unSub!: Subscription

  ngOnInit(): void {
    this.unSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoreisList = (res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.unSub.unsubscribe()
  }
}
