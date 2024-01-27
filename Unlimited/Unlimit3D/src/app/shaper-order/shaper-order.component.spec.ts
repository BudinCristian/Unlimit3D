import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaperOrderComponent } from './shaper-order.component';

describe('ShaperOrderComponent', () => {
  let component: ShaperOrderComponent;
  let fixture: ComponentFixture<ShaperOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShaperOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaperOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
