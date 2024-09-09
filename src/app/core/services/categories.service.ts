import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient)


  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.basrUrl}/api/v1/categories`)
  }

  getSpecificCategoriey(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.basrUrl}/api/v1/categories/${id}/subcategories`)
  }

  getBrands(): Observable<any> {
    return this._HttpClient.get(`${environment.basrUrl}/api/v1/brands`)
  }
}
