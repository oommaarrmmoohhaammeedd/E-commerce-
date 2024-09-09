import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  detailsProduct: Iproduct | null = null;
  productImages: [] = []
  unSub!: Subscription


  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get("id");


        this.unSub = this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            this.detailsProduct = res.data
            this.productImages = res.data.images
          },
          error: (err) => {
            console.log(err);

          },
        })
      },
    })
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe()
  }

  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
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
