import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
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
  selector: 'app-roles-usuario-editar',
  templateUrl: './editar.component.html',
  imports: [
    CommonModule,
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
export class UsuarioEditarComponent implements OnInit {

  formularioEdicion: FormGroup;
  roles: string[] = ['ADMIN', 'USER']; // Lista de roles disponibles
  usuarioId: string | undefined;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.formularioEdicion = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required] // Control para el rol
    });
  }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerUsuario(this.usuarioId);
  }

  obtenerUsuario(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/auth/usuario/crud/${id}`)
      .subscribe(
        usuario => {
          this.formularioEdicion.patchValue({
            username: usuario.username,
            role: usuario.roles[0].name, // Asumiendo que el rol está en usuario.roles[0].name
          });
          console.log('usuario obtenido:', usuario);
        },
        error => {
          console.error('Error al obtener el trabusuarioajador:', error);
        }
      );
  }

  editarUsuario() {
    if (this.formularioEdicion.valid) {
      const usuarioData = {
        username: this.formularioEdicion.value.username,
        password: this.formularioEdicion.value.password,
        roles: [
          {
            idRole: this.formularioEdicion.value.role === 'USER' ? 2 : 1,
            name: ''
          }
        ]
      };

      this.http.put<any>(`https://back-estudiojuridico.onrender.com/api/v1/auth/usuario/crud/update/${this.usuarioId}`, usuarioData)
        .subscribe(response => {
          console.log('usuario actualizado exitosamente:', response);
          alert('usuario actualizado exitosamente');
          this.router.navigate(['/ui-components/roles-usuario']);
        }, error => {
          console.error('Error al actualizar el usuario:', error);
          alert('Error al actualizar el usuario. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
}
