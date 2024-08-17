import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
export interface ClienteData {
  edad: number;
  fecha_cierre: string;
  fecha_inicio: string;
  genero: string;
  id_cliente: number;
  prediccion: string;
  ultima_actividad: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  private apiUrl = 'http://localhost:5000/predict';

  constructor(private http: HttpClient) { }

  predict(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }



  savePrediction(prediction: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5000/api/v1/prediccion/save`, prediction);
  }

  private apiUrl2 = 'http://localhost:8080/api/v1/prediccion/all'; // Reemplaza con la URL de tu API


  getData(): Observable<ClienteData[]> {
    // Simulando datos para probar el gráfico
    const data: ClienteData[] = [
      { id_cliente: 1, edad: 30, fecha_cierre: '2024-01-01', fecha_inicio: '2023-01-01', genero: 'M', prediccion: 'A', ultima_actividad: '2024-06-01' },
      { id_cliente: 2, edad: 25, fecha_cierre: '2024-02-01', fecha_inicio: '2023-02-01', genero: 'F', prediccion: 'B', ultima_actividad: '2024-06-02' },
      { id_cliente: 3, edad: 40, fecha_cierre: '2024-03-01', fecha_inicio: '2023-03-01', genero: 'M', prediccion: 'C', ultima_actividad: '2024-06-03' },
    ];
    return of(data);
    // Para obtener datos reales de la API, descomentar la siguiente línea
    // return this.http.get<ClienteData[]>(this.apiUrl);
  }


  private apiUrl3 = 'http://localhost:8080/api/v1/prediccion/all';


  getPredicciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }
}
