import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateMyDasboardFormComponent } from './user-update-my-dasboard-form.component';

describe('UserUpdateMyDasboardFormComponent', () => {
  let component: UserUpdateMyDasboardFormComponent;
  let fixture: ComponentFixture<UserUpdateMyDasboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateMyDasboardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateMyDasboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
