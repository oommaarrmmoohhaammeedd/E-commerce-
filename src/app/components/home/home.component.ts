import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategories } from '../../core/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass, NgIf } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  productList: Iproduct[] = []
  categoreisList: Icategories[] = []
  unSub!: Subscription
  text: string = ""
  dataList:  any = []
  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false
  }

  catOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    navSpeed: 1200,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show('loading-1')
    this.unSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoreisList = (res.data);
        this._NgxSpinnerService.hide('loading-1')
      },
      error: (err) => {
        console.log(err);
      }
    })


    this.unSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = (res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.unSub?.unsubscribe()
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
        this.dataList = res.data
        this._ToastrService.success(res.message)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
