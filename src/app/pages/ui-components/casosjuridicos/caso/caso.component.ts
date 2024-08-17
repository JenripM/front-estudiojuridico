import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';


export interface Actividad {
  id: number;
  nombre: string;
  prioridad: string;
  estado: string,
  fecha_inicio: Date,
  fecha_cierre: Date,
  descripcion: string,
  caso: {
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
    },
  },
  trabajador: {
    trabajadorId: number,
    nombres: string,
    apellidos: string,
    direccion: string,
    email: string,
    celular: string,
    cargo: {
      id: number,
      nombre: string,
      },
    },
}

@Component({
  selector: 'app-casosjuridicos-caso',
  templateUrl: './caso.component.html',
  //styleUrl: './caso.component.scss',
  imports: [
    CommonModule, // <-- Añade CommonModule aquí
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatListModule,
    // MatDatepickerModule, // Import MatDatepickerModule
    // MatNativeDateModule,

  ],
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  // ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CasosCasoComponent implements OnInit {
  //actividades: any[] = []; // Arreglo para almacenar los clientes obtenidos del servidor
  casoId: string | undefined;
  actividades: MatTableDataSource<Actividad>;
  displayedColumns: string[] = ['id', 'nombre', 'prioridad', 'estado', 'fecha_inicio', 'fecha_cierre', 'descripcion', 'trabajador', 'actions'];
  caso: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.actividades = new MatTableDataSource<Actividad>([]);
  }

  formatDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.casoId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerActividades(this.casoId);
    this.obtenerCaso(this.casoId);
  }

  obtenerActividades(id: string) {
    this.http.get<any[]>(`https://back-estudiojuridico.onrender.com/api/v1/actividad/caso/${id}`)
      .subscribe(
        actividades => {
          this.actividades.data = actividades; // Asigna los datos obtenidos al arreglo de datos de MatTableDataSource
          this.actividades.paginator = this.paginator;
          this.actividades.sort = this.sort;
          console.log('actividadess obtenidas:', this.actividades);
        },
        error => {
          console.error('Error al obtener las actividades:', error);
        }
      );
  }

  obtenerCaso(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/caso/${id}`)
      .subscribe(
        caso => {
          this.caso = caso; // Asigna el caso a la variable
          console.log('caso obtenido:', this.caso);
        },
        error => {
          console.error('Error al obtener el caso:', error);
        }
      );
  }
}
