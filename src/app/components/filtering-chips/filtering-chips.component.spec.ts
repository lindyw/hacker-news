import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringChipsComponent } from './filtering-chips.component';

describe('FilteringChipsComponent', () => {
  let component: FilteringChipsComponent;
  let fixture: ComponentFixture<FilteringChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteringChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteringChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
