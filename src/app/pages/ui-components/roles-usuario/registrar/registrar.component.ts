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
import { MatRadioModule } from '@angular/material/radio'; // Importa MatRadioModule


@Component({
  selector: 'app-roles-usuario-registrar',
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
    MatRadioModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class UsuarioRegistrarComponent {

  formularioRegistro: FormGroup;
  roles: string[] = ['ADMIN', 'USER']; // Lista de roles disponibles
  pathDeRegistro: string | undefined;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private location: Location
  ) {
    this.formularioRegistro = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required] // Control para el rol
    });
  }

  registrarUsuario() {
    if (this.formularioRegistro.valid) {
      // Crear el objeto a enviar con el formato esperado por el backend
      const usuarioData = {
        username: this.formularioRegistro.value.username,
        password: this.formularioRegistro.value.password
      };
  
      if(this.formularioRegistro.value.role == 'USER'){
        this.pathDeRegistro = 'https://back-estudiojuridico.onrender.com/api/v1/auth/register';
      }else{
        this.pathDeRegistro = 'https://back-estudiojuridico.onrender.com/api/v1/auth/registerAdm';
      }

      // Envía la solicitud POST al backend
      this.http.post<string>(this.pathDeRegistro, usuarioData, { responseType: 'text' as 'json' })
        .subscribe(
          response => {
            console.log('Usuario registrado exitosamente:', response);
            alert('Usuario registrado exitosamente');
            this.router.navigate(['/ui-components/roles-usuario']); // Navega a la ruta '/ui-components/roles-usuario'
          },
          error => {
            // Maneja los errores y muestra un mensaje adecuado al usuario
            if (error.error instanceof ErrorEvent) {
              // Errores del lado del cliente
              console.error('Error del lado del cliente:', error.error.message);
            } else {
              // Errores del lado del servidor
              console.error('Error del lado del servidor:', error.error);
            }
            alert('Error al registrar el usuario. Por favor, intenta nuevamente.');
          }
        );
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
  
}



