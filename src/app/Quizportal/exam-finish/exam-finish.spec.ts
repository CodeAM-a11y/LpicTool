import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFinish } from './exam-finish';

describe('ExamFinish', () => {
  let component: ExamFinish;
  let fixture: ComponentFixture<ExamFinish>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamFinish],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamFinish);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
