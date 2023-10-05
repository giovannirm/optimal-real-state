export interface IAuthDTO {
    accessToken: string
    tokenType: string
}

export interface IErrorDTO {
    timestamp: Date,
    status: number,
    error: string,
    message: string,
    path: string
}