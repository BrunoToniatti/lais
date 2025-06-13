import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencionComponent } from './manutencion.component';

describe('ManutencionComponent', () => {
  let component: ManutencionComponent;
  let fixture: ComponentFixture<ManutencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
