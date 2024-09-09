import { Component, computed, inject, OnInit, Signal, } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService)
  readonly _CartService = inject(CartService)
  counterNumber: Signal<number> = computed(() => this._CartService.cartNumber())
  ngOnInit(): void {
    this._CartService.addProductsToCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })

  }
}
