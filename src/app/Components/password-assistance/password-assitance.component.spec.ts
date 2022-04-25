import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAssitanceComponent } from './password-assistance.component';

describe('PasswordAssitanceComponent', () => {
  let component: PasswordAssitanceComponent;
  let fixture: ComponentFixture<PasswordAssitanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAssitanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAssitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
