import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscarderedComponent } from './discardered.component';

describe('DiscarderedComponent', () => {
  let component: DiscarderedComponent;
  let fixture: ComponentFixture<DiscarderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscarderedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscarderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
