import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteappComponent } from './clienteapp.component';

describe('ClienteappComponent', () => {
  let component: ClienteappComponent;
  let fixture: ComponentFixture<ClienteappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
