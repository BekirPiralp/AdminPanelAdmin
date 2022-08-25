export class MailPassword{
    public email!:string;
    public password!:string
}

export class TokenResponse{
    public token!:string
    public refreshToken!:string
    public sonKullanımTarihi!:Date
}

export class MailRefreshToken{
    public email!:string
    public refreshToken!:string
}