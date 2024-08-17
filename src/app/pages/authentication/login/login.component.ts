import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  username: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  login() {
    console.log(this.username);
    console.log(this.password);

    let bodyData = {
      username: this.username,
      password: this.password,
    };

    this.http.post("http://localhost:8080/api/v1/auth/login", bodyData).subscribe((resultData: any) => {
      console.log(resultData.tokenType);

      if (resultData.tokenType == "Bearer ") {
        this.authService.login(resultData.token); // Guarda el token de autenticación
        this.router.navigateByUrl('/dashboard');
      } else {
        alert("Incorrect username and Password not match");
      }

      // if (resultData.message == "username not exists") {
      //   alert("username not exists");
      // } else if (resultData.message == "Login Success") {
      //   this.authService.login(resultData.token); // Guarda el token de autenticación
      //   this.router.navigateByUrl('/dashboard');
      // } else {
      //   alert("Incorrect username and Password not match");
      // }
    });
  }
}
