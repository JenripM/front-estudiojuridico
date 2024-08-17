import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private apiUrl = 'http://localhost:8080/api/v1/prediccion/all';

  constructor(private http: HttpClient) {}

  getPredicciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
