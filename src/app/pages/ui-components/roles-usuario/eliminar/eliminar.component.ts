import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-roles-usuario-eliminar',
  templateUrl: './eliminar.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioEliminarComponent implements OnInit {
  usuario: any;
  usuarioId: string | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerUsuario(this.usuarioId);
  }


  obtenerUsuario(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/auth/usuario/crud/${id}`)
      .subscribe(
        usuario => {
          this.usuario = usuario;
          console.log('usuario obtenido:', usuario);
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
  }

  confirmarEliminacion() {
    this.http.delete<any>(`https://back-estudiojuridico.onrender.com/api/v1/auth/usuario/crud/delete/${this.usuarioId}`)
      .subscribe(
        response => {
          console.log('usuario eliminado exitosamente:', response);
          alert('usuario eliminado exitosamente');
          this.router.navigate(['/ui-components/roles-usuario']);
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario. Por favor, intenta nuevamente.');
        }
      );
  }

  cancelarEliminacion() {
    this.router.navigate(['/ui-components/roles-usuario']);
  }
}
