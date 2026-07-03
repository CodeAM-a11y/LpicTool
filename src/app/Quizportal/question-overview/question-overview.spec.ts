import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOverview } from './question-overview';

describe('QuestionOverview', () => {
  let component: QuestionOverview;
  let fixture: ComponentFixture<QuestionOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
