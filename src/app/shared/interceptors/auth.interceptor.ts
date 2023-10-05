import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '@infrastructure/services/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const { token } = this.authService.getToken()

    if (!token) return next.handle(request)

    // Clonar la solicitud y agregar el token a la cabecera
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: token
      }
    })

    return next.handle(clonedRequest)
  }
}