import { Injectable } from "@angular/core";
import { HttpClient, HttpContext, HttpContextToken, HttpHeaders, HttpRequest } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt'
import {
  MailPassword,
  MailRefreshToken,
  TokenResponse,
} from "../../models/Other/authenticationKismi";
import { AlertifyService } from "../alertify/alertify.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _alertifyService: AlertifyService,
  ) {}
  private _jwt:JwtHelperService = new JwtHelperService();
  path: string = "http://galeriapi.net01.site/";
  tokenResponse?: TokenResponse;
  public set TokenReponse(value: typeof this.tokenResponse){
    localStorage.setItem('token',value!.token)
    localStorage.setItem('refreshToken',value!.refreshToken)
    localStorage.setItem('sonKullanimTarihi',value!.sonKullanımTarihi.toString())
    this.tokenResponse=value;
  }

  public get TokenReponse(){
    return this.tokenResponse;
  }

  login(mailPasswrd: MailPassword) {
    this.http
      .post<TokenResponse>(this.path + "Login", mailPasswrd)
      .subscribe((data) => {
        this.TokenReponse = data;
        this._alertifyService.basarili( "Giriş başarılı: "+this.tokenResponse!.token);
        console.log(data)
      },(response)=>{
        this.TokenReponse=undefined;
        if(response.status == 400)
        this._alertifyService.hata(response.error);
        else
        this._alertifyService.hata(response.error+" status:"+response.status)
      });
  }

  loginRefresh(){
    
    this.http
      .post<TokenResponse>(this.path + "Login/Refresh", this.decode())
      .subscribe((data) => {
        this.TokenReponse = data;
        this._alertifyService.basarili( "Yenileme başarılı: "+this.tokenResponse!.token);
        console.log(data)
      },(response)=>{
        this.TokenReponse=undefined;
        if(response.status == 400)
        this._alertifyService.hata(response.error);
        else
        this._alertifyService.hata(response.error+" status:"+response.status)
      });
  }

  logout(){
    let headers:HttpHeaders=new HttpHeaders();

    headers=headers.append("Authorization","Bearer "+this.tokenResponse!.token);
    this.http.request("Delete",this.path + "Login",
    {body:this.decode(),headers:headers})
      .subscribe((data) => {
        //this.TokenReponse=undefined;
        this._alertifyService.basarili( "Çıkış başarılı! ");
        console.log(data)
      },(response)=>{
        //this.TokenReponse=undefined;
        if(response.status == 400)
        this._alertifyService.hata(response.error);
        else if (response.status == 0)
        this._alertifyService.hata("method bulunamadı")
        else
        this._alertifyService.hata(response.error+" status:"+response.status)
      });
  }

  private decode(){
    let mailRefresh:MailRefreshToken={
      email :this._jwt.decodeToken(this.tokenResponse!.token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'].toString(),
      refreshToken:this.tokenResponse!.refreshToken
    };

    return mailRefresh;
  }
}
