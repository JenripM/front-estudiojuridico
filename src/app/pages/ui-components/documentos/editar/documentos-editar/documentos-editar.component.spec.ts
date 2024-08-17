import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosEditarComponent } from './documentos-editar.component';

describe('DocumentosEditarComponent', () => {
  let component: DocumentosEditarComponent;
  let fixture: ComponentFixture<DocumentosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
