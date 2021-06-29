import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoghtmlComponent } from './dialoghtml.component';

describe('DialoghtmlComponent', () => {
  let component: DialoghtmlComponent;
  let fixture: ComponentFixture<DialoghtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoghtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoghtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
