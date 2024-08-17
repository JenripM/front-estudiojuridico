import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-trabajador-eliminar',
  templateUrl: './eliminar.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EliminarComponent implements OnInit {
  trabajador: any;
  trabajadorId: string | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.trabajadorId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerTrabajador(this.trabajadorId);
  }

  obtenerTrabajador(id: string) {
    this.http.get<any>(`http://localhost:8080/api/v1/trabajador/${id}`)
      .subscribe(
        trabajador => {
          this.trabajador = trabajador;
          console.log('Trabajador obtenido:', trabajador);
        },
        error => {
          console.error('Error al obtener el trabajador:', error);
        }
      );
  }

  confirmarEliminacion() {
    this.http.delete<any>(`http://localhost:8080/api/v1/trabajador/delete/${this.trabajadorId}`)
      .subscribe(
        response => {
          console.log('Trabajador eliminado exitosamente:', response);
          alert('Trabajador eliminado exitosamente');
          this.router.navigate(['/ui-components/trabajadores']);
        },
        error => {
          console.error('Error al eliminar el trabajador:', error);
          alert('Error al eliminar el trabajador. Por favor, intenta nuevamente.');
        }
      );
  }

  cancelarEliminacion() {
    this.router.navigate(['/ui-components/trabajadores']);
  }
}
