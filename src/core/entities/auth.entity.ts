import { IAuthDTO } from "@infrastructure/dtos/auth.dto"

export interface IDataAuth {
    username: string
    password: string
}

export interface IAuth {
    accessToken: string
    tokenType: string
}

export class AuthEntity implements IAuth {
    accessToken: string
    tokenType: string

    constructor() {
        this.accessToken = ''
        this.tokenType = ''
    }

    public setEntityFromDTO(authDTO: IAuthDTO): void {
        this.accessToken = authDTO.accessToken
        this.tokenType = authDTO.tokenType
    }
}
