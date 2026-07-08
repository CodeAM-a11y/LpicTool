import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseMode } from './exercise-mode';

describe('ExerciseMode', () => {
  let component: ExerciseMode;
  let fixture: ComponentFixture<ExerciseMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseMode],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseMode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
