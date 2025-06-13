import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicationButtonComponent } from './aplication-button.component';

describe('AplicationButtonComponent', () => {
  let component: AplicationButtonComponent;
  let fixture: ComponentFixture<AplicationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicationButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AplicationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
