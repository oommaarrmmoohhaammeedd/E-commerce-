import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)
  myHeader: any = { token: localStorage.getItem("userToken") }
  cartNumber: WritableSignal<number> = signal(0)

  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.basrUrl}/api/v1/cart`,
      {
        "productId": id
      },
      {
        headers: this.myHeader
      }
    )
  }


  addProductsToCart(): Observable<any> {
    return this._HttpClient.get(`${environment.basrUrl}/api/v1/cart`,
      {
        headers: this.myHeader
      }
    )
  }

  removeSpecificItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.basrUrl}/api/v1/cart/${id}`,
      {
        headers: this.myHeader
      }
    )
  }

  updateItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.basrUrl}/api/v1/cart/${id}`,
      {
        "count": count
      },
      {
        headers: this.myHeader
      }
    )
  }

  deleteCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.basrUrl}/api/v1/cart`,
      {
        headers: this.myHeader
      }
    )
  }
}
