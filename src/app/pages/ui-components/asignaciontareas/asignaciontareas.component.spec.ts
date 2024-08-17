import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaciontareasComponent } from './asignaciontareas.component';

describe('AsignaciontareasComponent', () => {
  let component: AsignaciontareasComponent;
  let fixture: ComponentFixture<AsignaciontareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaciontareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignaciontareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
