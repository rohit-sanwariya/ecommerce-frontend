import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeMainChartComponent } from './admin-home-main-chart.component';

describe('AdminHomeMainChartComponent', () => {
  let component: AdminHomeMainChartComponent;
  let fixture: ComponentFixture<AdminHomeMainChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeMainChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeMainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
