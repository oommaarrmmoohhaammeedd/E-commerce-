import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  msgErr: string = ""
  isLoading: boolean = false
  unSub!: Subscription

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }, this.confirmPassword);

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true
      this.unSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message == 'success') {
            this._Router.navigate(['/login'])
          }
          this.isLoading = false
        },
        error: (err: HttpErrorResponse) => {
          this.msgErr = err.error.message
          console.log(err)
          this.isLoading = false
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.unSub?.unsubscribe()
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      return { missMatch: true }
    }
  }
}
