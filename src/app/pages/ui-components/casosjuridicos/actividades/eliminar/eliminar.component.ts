import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-casosjuridicos-actividades-eliminar',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss'
})
export class ActividadesEliminarComponent implements OnInit{
  actividad: any;
  actividadId: string | undefined;
  casoId: string | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.actividadId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerActividad(this.actividadId);
  }

  obtenerActividad(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/actividad/${id}`)
      .subscribe(
        actividad => {
          this.actividad = actividad;
          this.casoId = actividad.caso.id;
          console.log('Actividad obtenida:', actividad);
        },
        error => {
          console.error('Error al obtener la actividad:', error);
        }
      );
  }


  confirmarEliminacion() {
    this.http.delete<any>(`https://back-estudiojuridico.onrender.com/api/v1/actividad/delete/${this.actividadId}`)
      .subscribe(
        response => {
          console.log('Actividad eliminado exitosamente:', response);
          alert('Actividad eliminado exitosamente');
          this.router.navigate(['/ui-components/casosjuridicos/caso', this.casoId]);
        },
        error => {
          console.error('Error al eliminar la actividad:', error);
          alert('Error al eliminar el caso. Por favor, intenta nuevamente.');
        }
      );
  }

  cancelarEliminacion() {
    this.router.navigate(['/ui-components/casosjuridicos/caso', this.casoId]);
  }
}
