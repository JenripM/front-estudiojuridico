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
  selector: 'app-trabajador-editar',
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
    MatPaginatorModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarComponent implements OnInit {
  formularioEdicion: FormGroup;
  cargos: any[] = [];
  trabajadorId: string | undefined;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.formularioEdicion = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      cargoId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.trabajadorId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerCargos();
    this.obtenerTrabajador(this.trabajadorId);
  }

  obtenerCargos() {
    this.http.get<any[]>('https://back-estudiojuridico.onrender.com/api/v1/cargo/all')
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

  obtenerTrabajador(id: string) {
    this.http.get<any>(`https://back-estudiojuridico.onrender.com/api/v1/trabajador/${id}`)
      .subscribe(
        trabajador => {
          this.formularioEdicion.patchValue({
            nombres: trabajador.nombres,
            apellidos: trabajador.apellidos,
            direccion: trabajador.direccion,
            email: trabajador.email,
            celular: trabajador.celular,
            cargoId: trabajador.cargo.id,
          });
          console.log('Trabajador obtenido:', trabajador);
        },
        error => {
          console.error('Error al obtener el trabajador:', error);
        }
      );
  }

  editarTrabajador() {
    if (this.formularioEdicion.valid) {
      const trabajadorData = {
        nombres: this.formularioEdicion.value.nombres,
        apellidos: this.formularioEdicion.value.apellidos,
        direccion: this.formularioEdicion.value.direccion,
        email: this.formularioEdicion.value.email,
        celular: this.formularioEdicion.value.celular,
        cargo: {
          id: this.formularioEdicion.value.cargoId,
          nombre: ''
        }
      };

      this.http.put<any>(`https://back-estudiojuridico.onrender.com/api/v1/trabajador/update/${this.trabajadorId}`, trabajadorData)
        .subscribe(response => {
          console.log('Trabajador actualizado exitosamente:', response);
          alert('Trabajador actualizado exitosamente');
          this.router.navigate(['/ui-components/trabajadores']);
        }, error => {
          console.error('Error al actualizar el trabajador:', error);
          alert('Error al actualizar el trabajador. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
}
