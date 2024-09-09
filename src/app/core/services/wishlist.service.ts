import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient)
  myHeader: any = { token: localStorage.getItem("userToken") }

  getUserWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.basrUrl}/api/v1/wishlist`,
      {
        headers: this.myHeader
      })
  }

  addProductToList(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.basrUrl}/api/v1/wishlist`, {
      "productId": id
    },
      {
        headers: this.myHeader
      }
    )
  }

  removeProductFromList(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.basrUrl}/api/v1/wishlist/${id}`, {
      headers: this.myHeader
    })
  }
}
