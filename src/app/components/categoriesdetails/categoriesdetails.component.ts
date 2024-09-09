import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IcatDetails } from '../../core/interfaces/icat-details';

@Component({
  selector: 'app-categoriesdetails',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categoriesdetails.component.html',
  styleUrl: './categoriesdetails.component.css'
})
export class CategoriesdetailsComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  categoryDetails!: IcatDetails[];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idCategory = p.get("id");


        this._CategoriesService.getSpecificCategoriey(idCategory).subscribe({
          next: (res) => {
            console.log(res.data);
            this.categoryDetails = res.data
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }
}
