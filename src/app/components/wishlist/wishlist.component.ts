import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { IList } from '../../core/interfaces/ilist';
import { NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgClass],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartServiceF = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  dataList: IList[] = [];
  unSub!: Subscription
  ngOnInit(): void {
    this.unSub = this._WishlistService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.dataList = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeItemFromList(id: string): void {
    this.unSub = this._WishlistService.removeProductFromList(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addCart(id: string): void {
    this._CartServiceF.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
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
