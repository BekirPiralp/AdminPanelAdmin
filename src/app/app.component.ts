import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  
  constructor(private _auth:AuthService) {
    
  }
  title = 'Admin';
  test(){
    this._auth.login({
      email:"test01@mail.com",
      password:"test01"
    })
  }

  test2(){
    console.log(this._auth.getToken())
  }

  test3(){
    this._auth.logout()
  }

  test4(){
    console.log(this._auth.isLogin())
  }
}
