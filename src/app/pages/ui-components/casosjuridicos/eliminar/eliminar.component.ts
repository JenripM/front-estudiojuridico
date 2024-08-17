import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-casosjuridicos-eliminar',
  templateUrl: './eliminar.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasosEliminarComponent implements OnInit {
  caso: any;
  casoId: string | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.casoId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerCaso(this.casoId);
  }

  obtenerCaso(id: string) {
    this.http.get<any>(`http://localhost:8080/api/v1/caso/${id}`)
      .subscribe(
        caso => {
          this.caso = caso;
          console.log('Caso obtenido:', caso);
        },
        error => {
          console.error('Error al obtener el caso:', error);
        }
      );
  }


  confirmarEliminacion() {
    this.http.delete<any>(`http://localhost:8080/api/v1/caso/delete/${this.casoId}`)
      .subscribe(
        response => {
          console.log('Caso eliminado exitosamente:', response);
          alert('Caso eliminado exitosamente');
          this.router.navigate(['/ui-components/casosjuridicos']);
        },
        error => {
          console.error('Error al eliminar el caso:', error);
          alert('Error al eliminar el caso. Por favor, intenta nuevamente.');
        }
      );
  }

  cancelarEliminacion() {
    this.router.navigate(['/ui-components/casosjuridicos']);
  }
}

