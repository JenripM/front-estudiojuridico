import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
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

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'DD/MM/YYYY',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-casosjuridicos-registrar',
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

export class CasosRegistrarComponent implements OnInit {
  formularioRegistro: FormGroup;
  clientes: any[] = []; // Arreglo para almacenar los clientes obtenidos del servidor

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.formularioRegistro = this.fb.group({
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      fecha_inicio: ['', Validators.required ],
      //this.dateValidator
      fecha_cierre: ['',Validators.required],
      descripcion: ['', Validators.required],
      clienteId: ['', Validators.required], // Campo para almacenar el ID del cliente seleccionado
    },//{ validator: this.compareDatesValidator('fecha_inicio', 'fecha_cierre') }
    ) ;
  }

  ngOnInit(): void {
    this.obtenerClientes();
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

  obtenerClientes() {
    this.http.get<any[]>('http://localhost:8080/api/v1/cliente/all')
      .subscribe(
        clientes => {
          this.clientes = clientes;
          console.log('Clientes obtenidos:', this.clientes);
        },
        error => {
          console.error('Error al obtener los clientes:', error);
        }
      );
  }

  registrarCaso() {
    if (this.formularioRegistro.valid) {
      // Crear el objeto a enviar con el formato esperado por el backend
      const casoData = {
        tipo: this.formularioRegistro.value.tipo,
        estado: this.formularioRegistro.value.estado,
        fecha_inicio: this.formularioRegistro.value.fecha_inicio,
        fecha_cierre: this.formularioRegistro.value.fecha_cierre,
        descripcion: this.formularioRegistro.value.descripcion,
        cliente: {
          id: this.formularioRegistro.value.clienteId, // Asumiendo que clienteId es el id del cliente seleccionado
          nombre: '' // Puedes dejar esto vacío o no incluirlo si el backend no lo requiere
        }
      };
      console.log('Caso registrado exitosamente:', casoData.tipo,casoData.estado,
        casoData.fecha_inicio,casoData.fecha_cierre,casoData.fecha_cierre,casoData.fecha_cierre);

      this.http.post<any>('http://localhost:8080/api/v1/caso/save', casoData)
        .subscribe(response => {
          console.log('Caso registrado exitosamente:', response);
          alert('Caso registrado exitosamente');
          this.router.navigate(['/ui-components/casosjuridicos']); // Navega a la ruta '/ui-components/casosjuridicos'
        }, error => {
          console.error('Error al registrar el caso:', error);
          alert('Error al registrar el caso. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }

}
