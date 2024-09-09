import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)
  dataList: Iproduct[] = []
  text: string = ""
  unSub!: Subscription

  ngOnInit(): void {
    this.unSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.dataList = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addCart(id: string): void {
    this.unSub = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  ngOnDestroy(): void {
    this.unSub?.unsubscribe()
  }
  addProductToWishList(id: string): void {
    this._WishlistService.addProductToList(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
