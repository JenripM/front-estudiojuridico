import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-casosjuridicos-actividades-editar',
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
    // MatDatepickerModule, // Import MatDatepickerModule
    // MatNativeDateModule,

  ],
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  // ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class ActividadesEditarComponent {
  formularioEdicion: FormGroup;
  trabajadores: any[] = []; // Arreglo para almacenar los clientes obtenidos del servidor
  actividadId: string | undefined;
  actividad: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.formularioEdicion = this.fb.group({
      nombre: ['', Validators.required],
      prioridad: ['', Validators.required],
      estado: ['', Validators.required],
      fecha_inicio: ['', Validators.required ],
      //this.dateValidator
      fecha_cierre: ['',Validators.required],
      descripcion: ['', Validators.required],
      trabajadorId: ['', Validators.required], // Campo para almacenar el ID del cliente seleccionado
    },//{ validator: this.compareDatesValidator('fecha_inicio', 'fecha_cierre') }
    ) ;
  }



  ngOnInit(): void {
    this.actividadId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerTrabajadores();
    this.obtenerActividad(this.actividadId);
  }

  obtenerTrabajadores() {
    this.http.get<any[]>('https://back-estudiojuridico.onrender.com/api/v1/trabajador/all')
      .subscribe(
        trabajadores => {
          this.trabajadores = trabajadores;
          console.log('Trabajadores obtenidos:', this.trabajadores);
        },
        error => {
          console.error('Error al obtener los trabajadores:', error);
        }
      );
  }

  formatDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  obtenerActividad(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/actividad/${id}`)
      .subscribe(
        actividad => {
          this.formularioEdicion.patchValue({
            nombre: actividad.nombre,
            prioridad: actividad.prioridad,
            estado: actividad.estado,
            fecha_inicio: this.formatDate(actividad.fecha_inicio),
            fecha_cierre: this.formatDate(actividad.fecha_cierre),
            descripcion: actividad.descripcion,
            trabajadorId: actividad.trabajador.trabajadorId,
          });
          this.actividad=actividad;
          console.log('Actividad obtenida:', actividad);
        },
        error => {
          console.error('Error al obtener la actividad:', error);
        }
      );
  }

  editarActividad() {
    if (this.formularioEdicion.valid) {
      const actividadData = {
        nombre: this.formularioEdicion.value.nombre,
        prioridad: this.formularioEdicion.value.prioridad,
        estado: this.formularioEdicion.value.estado,
        fecha_inicio: this.formularioEdicion.value.fecha_inicio,
        fecha_cierre: this.formularioEdicion.value.fecha_cierre,
        descripcion: this.formularioEdicion.value.descripcion,
        trabajador: {
          trabajadorId: this.formularioEdicion.value.trabajadorId, // Asumiendo que clienteId es el id del cliente seleccionado
          nombres: '' // Puedes dejar esto vacío o no incluirlo si el backend no lo requiere
        },
        caso: {
          id: this.actividad.caso.id, // Asumiendo que clienteId es el id del cliente seleccionado
          nombre: '' // Puedes dejar esto vacío o no incluirlo si el backend no lo requiere
        }
      };

      this.http.put<any>(`https://back-estudiojuridico.onrender.com/api/v1/actividad/update/${this.actividadId}`, actividadData)
        .subscribe(response => {
          console.log('actividad actualizada exitosamente:', response);
          alert('actividad actualizada exitosamente');
          this.router.navigate(['/ui-components/casosjuridicos/caso', this.actividad.caso.id]);
        }, error => {
          console.error('Error al actualizar la actividad:', error);
          alert('Error al actualizar la actividad. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
}
