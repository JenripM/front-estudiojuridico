import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-documento-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],

  imports: [
    CommonModule, // <-- Añade CommonModule aquí
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoRegistrarComponent implements OnInit {
  formularioDocumento: FormGroup;
  casos: any[] = [];
  nombreArchivo: string = '';
  

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private location: Location
  ) {
    this.formularioDocumento = this.fb.group({
      tipo: ['', Validators.required],
      nombreArchivo: ['', Validators.required],
      casoId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerCasos();
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
      this.formularioDocumento.patchValue({
        nombreArchivo: this.nombreArchivo
      });
    } else {
      this.nombreArchivo = '';
    }
  }

  registrarDocumento() {
    if (this.formularioDocumento.valid) {
      const documentoData = {
        tipo: this.formularioDocumento.value.tipo,
        nombreArchivo: this.formularioDocumento.value.nombreArchivo,
        caso: {
          id: this.formularioDocumento.value.casoId,
        }
      };

      this.http.post<any>('https://back-estudiojuridico.onrender.com/api/v1/documento/save', documentoData)
        .subscribe(response => {
          console.log('Documento registrado exitosamente:', response);
          alert('Documento registrado exitosamente');
          this.router.navigate(['/ui-components/documentos']);
        }, error => {
          console.error('Error al registrar el documento:', error);
          alert('Error al registrar el documento. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }

}
