import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterEditProfileComponent } from './printer-edit-profile.component';

describe('PrinterEditProfileComponent', () => {
  let component: PrinterEditProfileComponent;
  let fixture: ComponentFixture<PrinterEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
