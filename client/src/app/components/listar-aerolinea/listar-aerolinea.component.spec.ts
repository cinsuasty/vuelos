import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAerolineaComponent } from './listar-aerolinea.component';

describe('ListarAerolineaComponent', () => {
  let component: ListarAerolineaComponent;
  let fixture: ComponentFixture<ListarAerolineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAerolineaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAerolineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
