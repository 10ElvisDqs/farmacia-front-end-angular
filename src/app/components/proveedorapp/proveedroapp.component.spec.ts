import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedroappComponent } from './proveedroapp.component';

describe('ProveedroappComponent', () => {
  let component: ProveedroappComponent;
  let fixture: ComponentFixture<ProveedroappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedroappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProveedroappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
