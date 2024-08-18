import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface Trabajador {
  id: number;
  nombres: string;
  apellidos: string;
  direccion: string;
  email: string;
  celular: string;
  cargo: {
    id: number;
    nombre: string;
  };
}

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class AppTrabajadoresComponent implements OnInit {
  displayedColumns: string[] = ['trabajadorId', 'nombres', 'apellidos', 'direccion', 'email', 'celular', 'cargo', 'actions'];
  dataSource: MatTableDataSource<Trabajador>; // Asegúrate de que MatTableDataSource sea del tipo Trabajador

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Trabajador>([]); // Inicializa MatTableDataSource con un arreglo vacío de Trabajador
  }

  ngOnInit(): void {
    this.obtenerTrabajadores();
  }

  obtenerTrabajadores() {
    this.http.get<Trabajador[]>('https://back-estudiojuridico.onrender.com/api/v1/trabajador/all')
      .subscribe(trabajadores => {
        this.dataSource.data = trabajadores; // Asigna los datos obtenidos al arreglo de datos de MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.error('Error al obtener los trabajadores:', error);
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
