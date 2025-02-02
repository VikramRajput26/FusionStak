import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePostComponent } from './updatepost.component'; // Correct the case here

describe('UpdatePostComponent', () => {
  let component: UpdatePostComponent; // Correct the case here
  let fixture: ComponentFixture<UpdatePostComponent>; // Correct the case here

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePostComponent], // Correct the case here
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePostComponent); // Correct the case here
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
