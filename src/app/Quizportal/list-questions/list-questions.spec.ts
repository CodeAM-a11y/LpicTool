import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestions } from './list-questions';

describe('ListQuestions', () => {
  let component: ListQuestions;
  let fixture: ComponentFixture<ListQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuestions],
    }).compileComponents();

    fixture = TestBed.createComponent(ListQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
