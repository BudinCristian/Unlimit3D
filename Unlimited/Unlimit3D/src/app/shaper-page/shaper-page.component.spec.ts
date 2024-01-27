import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaperPageComponent } from './shaper-page.component';

describe('ShaperPageComponent', () => {
  let component: ShaperPageComponent;
  let fixture: ComponentFixture<ShaperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShaperPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
