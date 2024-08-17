
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentosComponent } from './documentos.component';

describe('AppDocumentosComponent', () => {
  let component: AppDocumentosComponent;
  let fixture: ComponentFixture<AppDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});