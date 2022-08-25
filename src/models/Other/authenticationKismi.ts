export class MailPasswordToken{
    public mail!:string;
    public password!:string
}

export class TokenResponse{
    public token!:string
    public refreshToken!:string
    public sonKullanımTarihi!:Date
}