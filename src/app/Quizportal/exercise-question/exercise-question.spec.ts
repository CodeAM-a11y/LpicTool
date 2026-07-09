import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseQuestion } from './exercise-question';

describe('ExerciseQuestion', () => {
  let component: ExerciseQuestion;
  let fixture: ComponentFixture<ExerciseQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
