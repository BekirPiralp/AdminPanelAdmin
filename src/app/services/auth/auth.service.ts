import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  MailPassword,
  MailRefreshToken,
  TokenResponse,
} from "../../models/Other/authenticationKismi";
import { AlertifyService } from "../alertify/alertify.service";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _alertifyService: AlertifyService
  ) {}
  private _jwt: JwtHelperService = new JwtHelperService();
  path: string = "http://galeriapi.net01.site/";
  private tokenResponse?: TokenResponse | null;
  private set TokenReponse(value: typeof this.tokenResponse) {
    if (value != null) {
      localStorage.setItem("token", value!.token);
      localStorage.setItem("refreshToken", value!.refreshToken);
      localStorage.setItem(
        "sonKullanimTarihi",
        value!.sonKullanımTarihi.toString()
      );
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("sonKullanimTarihi");
    }
    this.tokenResponse = value;
  }

  private get TokenReponse() {
    try {
      this.tokenResponse = {
        token: localStorage.getItem("token")!,
        refreshToken: localStorage.getItem("refreshToken")!,
        sonKullanımTarihi: new Date(localStorage.getItem("sonKullanimTarihi")!),
      };
    } catch (error) {
      this.TokenReponse = null;
    }

    return this.tokenResponse;
  }

  private girilebilirmi = true;
  getToken() {
    if (this.isLogin()) {
      if (!this.isGecerli() && this.girilebilirmi) {
        this.loginRefresh();
      }
      return this.TokenReponse!;
    }
    return null;
  }

  isLogin() {
    if (this.TokenReponse?.refreshToken == null)
      // garip this.TokenResponse == null hep true verdi
      return false;
    else return true;
  }

  isGecerli() {
    return this.isLogin() == true &&
      this.TokenReponse!.sonKullanımTarihi.getTime()-3000 > Date.now()
      ? true
      : false;
  }

  login(mailPasswrd: MailPassword) {
    this.http.post<TokenResponse>(this.path + "Login", mailPasswrd).subscribe(
      (data) => {
        this.TokenReponse = data;
        this._alertifyService.basarili(
          "Giriş başarılı: " + this.tokenResponse!.token
        );
      },
      (response) => {
        this.TokenReponse = null;
        if (response.status == 400) this._alertifyService.hata(response.error);
        else
          this._alertifyService.hata(
            response.error + " status:" + response.status
          );
      }
    );
  }

  private loginRefresh() {
    this.girilebilirmi = false;
    if (this.isLogin() && !this.isGecerli()) {
      this.http
        .post<TokenResponse>(this.path + "Login/Refresh", this.decode())
        .subscribe(
          (data) => {
            this.TokenReponse = data;
            this.girilebilirmi = true;
          },
          (response) => {
            this.TokenReponse = null;
            if (response.status == 400)
              this._alertifyService.hata(response.error);
            else {
              this._alertifyService.hata(
                response.error + " status:" + response.status
              );
            }
            this.girilebilirmi = true;
          }
        );
    }
  }

  logout() {
    this._alertifyService.hata("Çıkış yapılıyor");
    this.TokenReponse = null;
  }

  
  create(mailPasswrd:MailPassword){
    this.http.post<any>(this.path+"Login/Create",mailPasswrd).pipe(catchError((response:HttpErrorResponse)=>{
      this._alertifyService.hata(`Hata Kod: ${response.status}\n Mesaj: ${response.message}`);
    return throwError(()=>{})
    })).subscribe((data)=>{
      this._alertifyService.basarili("Sİsteme başarı ile kayıt edildi.\n"+data["mail"])
    })
  }

  

  private decode() {
    let mailRefresh: MailRefreshToken = {
      email: this._jwt
        .decodeToken(this.tokenResponse!.token)
        [
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ].toString(),
      refreshToken: this.tokenResponse!.refreshToken,
    };

    return mailRefresh;
  }
}
