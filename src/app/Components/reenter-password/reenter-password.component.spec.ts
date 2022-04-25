import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenterPasswordComponent } from './reenter-password.component';

describe('ReenterPasswordComponent', () => {
  let component: ReenterPasswordComponent;
  let fixture: ComponentFixture<ReenterPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReenterPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenterPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
