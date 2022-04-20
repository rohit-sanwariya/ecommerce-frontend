import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserAddressComponent } from './dashboard-user-address.component';

describe('DashboardUserAddressComponent', () => {
  let component: DashboardUserAddressComponent;
  let fixture: ComponentFixture<DashboardUserAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUserAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
