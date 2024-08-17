import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-trabajador-registrar',
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
    MatPaginatorModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppTrabajadorRegistrarComponent implements OnInit {
  formularioRegistro: FormGroup;
  cargos: any[] = []; // Arreglo para almacenar los cargos obtenidos del servidor

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private location: Location
  ) {
    this.formularioRegistro = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      cargoId: ['', Validators.required], // Campo para almacenar el ID del cargo seleccionado
    });
  }

  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos() {
    this.http.get<any[]>('http://localhost:8080/api/v1/cargo/all')
      .subscribe(
        cargos => {
          this.cargos = cargos;
          console.log('Cargos obtenidos:', this.cargos);
        },
        error => {
          console.error('Error al obtener los cargos:', error);
        }
      );
  }

  registrarTrabajador() {
    if (this.formularioRegistro.valid) {
      // Crear el objeto a enviar con el formato esperado por el backend
      const trabajadorData = {
        nombres: this.formularioRegistro.value.nombres,
        apellidos: this.formularioRegistro.value.apellidos,
        direccion: this.formularioRegistro.value.direccion,
        email: this.formularioRegistro.value.email,
        celular: this.formularioRegistro.value.celular,
        cargo: {
          id: this.formularioRegistro.value.cargoId, // Asumiendo que cargoId es el id del cargo seleccionado
          nombre: '' // Puedes dejar esto vacío o no incluirlo si el backend no lo requiere
        }
      };
  
      this.http.post<any>('http://localhost:8080/api/v1/trabajador/save', trabajadorData)
        .subscribe(response => {
          console.log('Trabajador registrado exitosamente:', response);
          alert('Trabajador registrado exitosamente');
          this.router.navigate(['/ui-components/trabajadores']); // Navega a la ruta '/ui-components/trabajadores'
        }, error => {
          console.error('Error al registrar el trabajador:', error);
          alert('Error al registrar el trabajador. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
  
}
