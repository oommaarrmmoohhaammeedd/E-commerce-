import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  step: number = 1;
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  isLoading: boolean = false

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  verifyEmailSubmit(): void {
    if (this.verifyEmail.valid) {
      this.isLoading = true
      this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.statusMsg === 'success') {
            this.step = 2
          }
          this.isLoading = false
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }

  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true
      this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 'Success') {
            this.step = 3
          }
          this.isLoading = false
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }

  resetPasswordSubmit(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true
      this._AuthService.setResetPass(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem('userToken', res.token)
          this._AuthService.userData()
          this._Router.navigate(['/home'])
          this.isLoading = false
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }
}
