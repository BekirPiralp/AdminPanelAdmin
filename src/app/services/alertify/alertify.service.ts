import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  basarili(message:string){
    console.log("%c"+message,"color:green;");
    alertify.success(message);
  }

  uyari(message:string){
    console.log("%c"+message,"color:orange;");
    alertify.warning(message);
  }

  hata(message:string){
    console.log("%c"+message,"color:red;");
    alertify.error(message);
  }

  mesaj(message:string){
    console.log("%c"+message,"color:white;background-color:black;");
    alertify.message(message);
  }
}
