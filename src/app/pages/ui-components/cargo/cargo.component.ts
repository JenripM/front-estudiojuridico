import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoComponent implements OnInit {
  formularioCargo: FormGroup;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router
  ) {
    this.formularioCargo = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registrarCargo() {
    if (this.formularioCargo.valid) {
      const cargoData = {
        nombre: this.formularioCargo.value.nombre
      };
  
      this.http.post<any>('https://back-estudiojuridico.onrender.com/api/v1/cargo/save', cargoData)
        .subscribe(response => {
          console.log('Cargo registrado exitosamente:', response);
          alert('Cargo registrado exitosamente');
          this.router.navigate(['/ui-components/trabajadores']);
        }, error => {
          console.error('Error al registrar el cargo:', error);
          alert('Error al registrar el cargo. Por favor, intenta nuevamente.');
        });
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
}
