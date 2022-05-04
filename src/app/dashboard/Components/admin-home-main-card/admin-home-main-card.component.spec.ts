import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeMainCardComponent } from './admin-home-main-card.component';

describe('AdminHomeMainCardComponent', () => {
  let component: AdminHomeMainCardComponent;
  let fixture: ComponentFixture<AdminHomeMainCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeMainCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
