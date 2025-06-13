import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiliosComponent } from './cilios.component';

describe('CiliosComponent', () => {
  let component: CiliosComponent;
  let fixture: ComponentFixture<CiliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiliosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
