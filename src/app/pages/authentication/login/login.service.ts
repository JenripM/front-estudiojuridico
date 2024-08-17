import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs';
import { Employee } from './login';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    private url:string = "https://back-estudiojuridico.onrender.com/api/v1/user/all";

    constructor( private http:HttpClient){}
    getAll():Observable<Employee[]>{
        return this.http.get<Employee[]>(this.url);
    }
    authenticate(email: string, password: string): Observable<any> {
        // Aquí enviamos la solicitud de inicio de sesión al servidor
        return this.http.post<any>(`${this.url}/login`, { email, password });
      }
}