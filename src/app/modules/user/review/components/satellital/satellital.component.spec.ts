import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatellitalComponent } from './satellital.component';

describe('SatellitalComponent', () => {
  let component: SatellitalComponent;
  let fixture: ComponentFixture<SatellitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatellitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatellitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
