import { ComponentFixture, TestBed } from '@angular/core/testing';

import { question } from './question.component';

describe('Question', () => {
  let component: question;
  let fixture: ComponentFixture<question>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [question],
    }).compileComponents();

    fixture = TestBed.createComponent(question);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
