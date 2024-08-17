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
  selector: 'app-casosjuridicos-actividades-registrar',
  templateUrl: './registrar.component.html',
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
    // MatDatepickerModule, // Import MatDatepickerModule
    // MatNativeDateModule,

  ],
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  // ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ActividadesRegistrarComponent implements OnInit {
  formularioRegistro: FormGroup;
  trabajadores: any[] = []; // Arreglo para almacenar los clientes obtenidos del servidor
  casoId: string | undefined = "prueba";


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formularioRegistro = this.fb.group({
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
    this.casoId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerTrabajadores();
  }

  // dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   if (control.value) {
  //     const enteredDate = new Date(control.value);
  //     const currentDate = new Date();

  //     if (enteredDate < currentDate) {
  //       return { 'invalidDate': true }; // Fecha no válida
  //     }
  //   }
  //   return null; // Fecha válida
  // }

  // compareDatesValidator(controlName: string, compareToControlName: string): ValidatorFn {
  //   return (formGroup: AbstractControl): ValidationErrors | null => {
  //     const control = formGroup.get(controlName);
  //     const compareToControl = formGroup.get(compareToControlName);

  //     if (control && compareToControl && control.value && compareToControl.value) {
  //       const controlDate = new Date(control.value);
  //       const compareToControlDate = new Date(compareToControl.value);

  //       if (controlDate > compareToControlDate) {
  //         return { 'invalidDateRange': true };
  //       }
  //     }
  //     return null;
  //   }
  // }

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

  registrarActividad() {
    if (this.formularioRegistro.valid) {
      // Crear el objeto a enviar con el formato esperado por el backend
      let intValue: number = 0;
      if (this.casoId !== undefined) {
        const parsedValue = parseInt(this.casoId, 10);
        if (!isNaN(parsedValue)) {
          intValue = parsedValue;
        } else {
          console.warn(`El valor de casoId (${this.casoId}) no es un número entero válido.`);
        }
      } else {
        console.warn('El valor de casoId es undefined.');
      }
      const actividadData = {
        nombre: this.formularioRegistro.value.nombre,
        prioridad: this.formularioRegistro.value.prioridad,
        estado: this.formularioRegistro.value.estado,
        fecha_inicio: this.formularioRegistro.value.fecha_inicio,
        fecha_cierre: this.formularioRegistro.value.fecha_cierre,
        descripcion: this.formularioRegistro.value.descripcion,
        trabajador: {
          trabajadorId: this.formularioRegistro.value.trabajadorId, // Asumiendo que clienteId es el id del cliente seleccionado
          nombres: '' // Puedes dejar esto vacío o no incluirlo si el backend no lo requiere
        },
        caso: {
          id: intValue, // Asumiendo que clienteId es el id del cliente seleccionado
          nombre: '' // Puedes dejar esto vacío o no incluirlo si el backend no lo requiere
        }
      };
      console.log('Actividad registrada exitosamente:', actividadData);

      this.http.post<any>('https://back-estudiojuridico.onrender.com/api/v1/actividad/save', actividadData)
        .subscribe(response => {
          console.log('Actividad registrada exitosamente:', response);
          alert('Actividad registrada exitosamente');
          this.router.navigate(['/ui-components/casosjuridicos/caso', this.casoId]); // Navega a la ruta '/ui-components/casosjuridicos'
        }, error => {
          console.error('Error al registrar la actividad:', error);
          alert('Error al registrar la actividad. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }

}
