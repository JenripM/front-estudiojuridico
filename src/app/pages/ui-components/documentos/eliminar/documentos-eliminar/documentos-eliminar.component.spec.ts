import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosEliminarComponent } from './documentos-eliminar.component';

describe('DocumentosEliminarComponent', () => {
  let component: DocumentosEliminarComponent;
  let fixture: ComponentFixture<DocumentosEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentosEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
