import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantraCashComponent } from './mantra-cash.component';

describe('MantraCashComponent', () => {
  let component: MantraCashComponent;
  let fixture: ComponentFixture<MantraCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantraCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantraCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
