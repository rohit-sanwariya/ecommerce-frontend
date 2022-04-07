import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFromRegisterComponent } from './user-from-register.component';

describe('UserFromRegisterComponent', () => {
  let component: UserFromRegisterComponent;
  let fixture: ComponentFixture<UserFromRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFromRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFromRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
