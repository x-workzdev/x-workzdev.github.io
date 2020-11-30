import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewGadgetsComponent } from './gadgets.component';


describe('ViewGadgetsComponent', () => {
  let component: ViewGadgetsComponent;
  let fixture: ComponentFixture<ViewGadgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGadgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGadgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
