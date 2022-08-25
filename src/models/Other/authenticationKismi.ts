export class MailPasswordToken{
    public email!:string;
    public password!:string
}

export class TokenResponse{
    public token!:string
    public refreshToken!:string
    public sonKullanımTarihi!:Date
}

export class MailRefresh{
    public email!:string
    public refreshToken!:string
}