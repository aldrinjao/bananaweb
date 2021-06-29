import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmviewComponent } from './farmview.component';

describe('FarmviewComponent', () => {
  let component: FarmviewComponent;
  let fixture: ComponentFixture<FarmviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
