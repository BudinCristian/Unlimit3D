import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselClientComponent } from './carousel-client.component';

describe('CarouselClientComponent', () => {
  let component: CarouselClientComponent;
  let fixture: ComponentFixture<CarouselClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
