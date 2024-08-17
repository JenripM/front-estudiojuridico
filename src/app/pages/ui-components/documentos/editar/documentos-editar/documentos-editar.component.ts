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


@Component({
  selector: 'app-documentos-editar',
  templateUrl: './documentos-editar.component.html',
  styleUrls: ['./documentos-editar.component.scss'],
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
    MatPaginatorModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentosEditarComponent {
  formularioEdicion: FormGroup;
  casos: any[] = [];
  idDocumento: string | undefined;
  nombreArchivo: string = '';


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.formularioEdicion = this.fb.group({
      tipo: ['', Validators.required],
      nombreArchivo: ['', Validators.required],
      casoId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.idDocumento = this.route.snapshot.paramMap.get('id')!;
    this.obtenerCasos();
    this.obtenerDocumento(this.idDocumento );
  }
  obtenerCasos() {
    this.http.get<any[]>('https://back-estudiojuridico.onrender.com/api/v1/caso/all')
      .subscribe(
        casos => {
          this.casos = casos;
          console.log('Casos obtenidos:', this.casos);
        },
        error => {
          console.error('Error al obtener los casos:', error);
        }
      );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nombreArchivo = file.name;
      // Aquí podrías actualizar el FormGroup si es necesario
      this.formularioEdicion.patchValue({
        nombreArchivo: this.nombreArchivo
      });
    } else {
      this.nombreArchivo = '';
    }
  }
  obtenerDocumento(id: string) {
    this.http.get<any>(`hhttps://back-estudiojuridico.onrender.com/api/v1/documento/${id}`)
      .subscribe(
        documento => {
          this.formularioEdicion.patchValue({
            nombreArchivo: documento.nombreArchivo,
            tipo: documento.tipo,
            casoId: documento.caso.id,
          });
          console.log('Documento obtenido:', documento);
        },
        error => {
          console.error('Error al obtener el documento:', error);
        }
      );
  }

  editarDocumento() {
    if (this.formularioEdicion.valid) {
      const documentoData = {
        nombreArchivo: this.formularioEdicion.value.nombreArchivo,
        tipo: this.formularioEdicion.value.tipo,
        caso: {
          id: this.formularioEdicion.value.casoId,
        }
      };

      this.http.put<any>(`https://back-estudiojuridico.onrender.com/api/v1/documento/update/${this.idDocumento}`, documentoData)
        .subscribe(response => {
          console.log('Documento actualizado exitosamente:', response);
          alert('Documento actualizado exitosamente');
          this.router.navigate(['/ui-components/documentos']);
        }, error => {
          console.error('Error al actualizar el documento:', error);
          alert('Error al actualizar el documento. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }

}
