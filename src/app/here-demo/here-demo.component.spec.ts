import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HereDemoComponent } from './here-demo.component';

describe('HereDemoComponent', () => {
  let component: HereDemoComponent;
  let fixture: ComponentFixture<HereDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HereDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HereDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
