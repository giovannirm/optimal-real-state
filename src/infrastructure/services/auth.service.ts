import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, tap } from 'rxjs'
import { AuthEntity, IDataAuth } from 'src/core/entities/auth.entity'
import { environment } from 'src/enviroments/environment'
import { IAuthDTO, IErrorDTO } from '../dtos/auth.dto'
import { ErrorEntity } from '@core/entities/error.entity'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authEndpoint

    constructor(private http: HttpClient) {
        this.authEndpoint = environment.authEndpoint
    }

    login(auth: IDataAuth): Observable<AuthEntity | ErrorEntity> {
        return this.http.post<IAuthDTO>(this.authEndpoint, auth).pipe(
            map((auth: IAuthDTO) => {
                const { accessToken, tokenType } = auth
                localStorage.setItem('token', `${tokenType} ${accessToken}`)

                const expirationDate = new Date()
                expirationDate.setMinutes(expirationDate.getMinutes() + 1)
                localStorage.setItem('expiresIn', expirationDate.getTime().toString())

                const authEntity = new AuthEntity()
                authEntity.setEntityFromDTO(auth)
                return authEntity
            }),
            catchError(({ error }: { error: IErrorDTO}) => {
                console.log(error)
                const errorEntity = new ErrorEntity()
                errorEntity.setEntityFromDTO(error)
                return new Observable<ErrorEntity>(subscriber => subscriber.next(errorEntity))
            })
        )
    }

    logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('expiresIn')
    }

    getToken(): any {
        const tokenExpiration = localStorage.getItem('expiresIn')
        const token = localStorage.getItem('token')

        return { token, tokenExpiration }
    }
}
