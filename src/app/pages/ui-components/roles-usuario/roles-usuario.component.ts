import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Role {
  idRole: number;
  name: string;
}

export interface Usuario {
  idUsuario: number;
  username: string;
  password: string;
  roles: Role[];
}

@Component({
  selector: 'app-roles-usuario',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.scss']
})
export class RolesUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['idUsuario', 'username', 'roles', 'actions'];
  dataSource: MatTableDataSource<Usuario>; // Asegúrate de que MatTableDataSource sea del tipo Usuario

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Usuario>([]); // Inicializa MatTableDataSource con un arreglo vacío de Usuario
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get<Usuario[]>('https://back-estudiojuridico.onrender.com/api/v1/auth/usuario/crud/all')
      .subscribe(usuarios => {
        this.dataSource.data = usuarios; // Asigna los datos obtenidos al arreglo de datos de MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.error('Error al obtener los usuarios:', error);
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
