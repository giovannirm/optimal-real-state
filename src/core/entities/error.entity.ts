import { IErrorDTO } from '@infrastructure/dtos/auth.dto'

export interface IError {
    timestamp: Date
    status: number
    error: string
    message: string
    path: string
}

export class ErrorEntity implements IError {
    timestamp: Date
    status: number
    error: string
    message: string
    path: string

    constructor() {
        this.timestamp = new Date()
        this.status = 0
        this.error = ''
        this.message = ''
        this.path = ''
    }

    public setEntityFromDTO(errorDTO: IErrorDTO): void {
        this.timestamp = errorDTO.timestamp
        this.status = errorDTO.status
        this.error = errorDTO.error
        this.message = errorDTO.message
        this.path = errorDTO.path
    }
}
