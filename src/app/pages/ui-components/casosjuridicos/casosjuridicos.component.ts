import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface Caso {
  id: number;
  tipo: string;
  estado: string;
  fecha_inicio: Date;
  fecha_cierre: Date;
  descripcion: string;
  cliente: {
    id: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
  };
}
@Component({
  selector: 'app-casosjuridicos',
  templateUrl: './casosjuridicos.component.html',
  styleUrls: ['./casosjuridicos.component.scss']
})
export class CasosjuridicosComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'tipo', 'estado', 'fecha_inicio', 'fecha_cierre', 'descripcion', 'cliente', 'actions'];
  dataSource: MatTableDataSource<Caso>; // Asegúrate de que MatTableDataSource sea del tipo Trabajador

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Caso>([]); // Inicializa MatTableDataSource con un arreglo vacío de Trabajador
  }

  ngOnInit(): void {
    this.obtenerCasos();
  }

  formatDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  obtenerCasos() {
    this.http.get<Caso[]>('https://back-estudiojuridico.onrender.com/api/v1/caso/all')
      .subscribe(casos => {
        this.dataSource.data = casos; // Asigna los datos obtenidos al arreglo de datos de MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.error('Error al obtener los casos:', error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
