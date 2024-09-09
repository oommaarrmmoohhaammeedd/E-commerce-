import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  brands: IBrand[] = []

  ngOnInit(): void {
    this._CategoriesService.getBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
