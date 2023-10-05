import { Component } from '@angular/core'
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthEntity, IDataAuth } from '@core/entities/auth.entity'
import { ErrorEntity, IError } from '@core/entities/error.entity'
import { AuthService } from '@infrastructure/services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
    isLogged = false
    errorMessage = ''

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    get username() {
        return this.loginForm?.get('username') as FormControl
    }

    get password() {
        return this.loginForm?.get('password') as FormControl
    }

    loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    })

    onSubmit() {
        if (this.loginForm.invalid) return
        this.isLogged = true
        const auth = this.loginForm.value as IDataAuth

        this.authService.login(auth).subscribe(response => {
            if (response instanceof AuthEntity) {
                this.router.navigate(['/optima/dashboard'])
            } else if (response instanceof ErrorEntity) {
                this.errorMessage = response.message
            }
            this.isLogged = false
        })
    }
}
