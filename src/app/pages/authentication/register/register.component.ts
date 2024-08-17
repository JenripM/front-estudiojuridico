import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class AppSideRegisterComponent {
  userName: string ="";
  email: string ="";
  password: string ="";
  constructor(private http: HttpClient )
  {
  }
  save()
  {
  
    let bodyData = {
      "userName" : this.userName,
      "email" : this.email,
      "password" : this.password
    };
    this.http.post("https://back-estudiojuridico.onrender.com/api/v1/user/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
    });
  }
  
}

