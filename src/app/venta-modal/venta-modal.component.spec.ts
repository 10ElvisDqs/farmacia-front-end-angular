import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaModalComponent } from './venta-modal.component';

describe('VentaModalComponent', () => {
  let component: VentaModalComponent;
  let fixture: ComponentFixture<VentaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
