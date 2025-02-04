import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildregisterComponent } from './childregister.component';

describe('ChildregisterComponent', () => {
  let component: ChildregisterComponent;
  let fixture: ComponentFixture<ChildregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
