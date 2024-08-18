import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-documentos-eliminar',
  templateUrl: './documentos-eliminar.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentosEliminarComponent {
  documento: any;
  idDocumento: string | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.idDocumento = this.route.snapshot.paramMap.get('id')!;
    this.obtenerDocumento(this.idDocumento);
  }
  obtenerDocumento(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/documento/${id}`)
      .subscribe(
        documento => {
          this.documento = documento;
          console.log('documento obtenido:', documento);
        },
        error => {
          console.error('Error al obtener el documento:', error);
        }
      );
  }
  confirmarEliminacion() {
    this.http.delete<any>(`https://back-estudiojuridico.onrender.com/api/v1/documento/delete/${this.idDocumento}`)
      .subscribe(
        response => {
          console.log('documento eliminado exitosamente:', response);
          alert('documento eliminado exitosamente');
          this.router.navigate(['/ui-components/documentos']);
        },
        error => {
          console.error('Error al eliminar el documento:', error);
          alert('Error al eliminar el documento. Por favor, intenta nuevamente.');
        }
      );
  }

  cancelarEliminacion() {
    this.router.navigate(['/ui-components/documentos']);
  }
}
