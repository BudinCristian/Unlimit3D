import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyPrinterModalComponent } from './notify-printer-modal.component';

describe('NotifyPrinterModalComponent', () => {
  let component: NotifyPrinterModalComponent;
  let fixture: ComponentFixture<NotifyPrinterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyPrinterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyPrinterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
