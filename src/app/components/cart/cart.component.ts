import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  cartData: ICart = {} as ICart

  ngOnInit(): void {
    this._CartService.addProductsToCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  deleteItem(id: string): void {
    this._CartService.removeSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success('item removed from shop cart')
        this.cartData = res.data
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateProduct(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateItem(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartData = res.data
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  clearCart(): void {
    this._CartService.deleteCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartData = {} as ICart
          this._CartService.cartNumber.set(0)
        }

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
