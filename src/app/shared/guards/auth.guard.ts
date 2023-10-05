import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '@infrastructure/services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        // Lógica de validación para verificar si aún existe el token
        const { token, tokenExpiration } = this.authService.getToken()

        // Verifica si existe un token almacenado y si ha expirado
        if (parseInt(tokenExpiration) && new Date(parseInt(tokenExpiration)) < new Date()) {
            // Elimina el token si ha expirado
            localStorage.removeItem('token')
            localStorage.removeItem('expiresIn')

            // Redirige al usuario a la página de inicio de sesión
            this.router.navigate(['/'])
        }

        if (token) {
            return true
        }

        // Si no hay token, redirigir al inicio de sesión
        this.router.navigate(['/login'])
        return false
    }
}
