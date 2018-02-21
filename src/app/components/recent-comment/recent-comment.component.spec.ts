import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCommentComponent } from './recent-comment.component';

describe('RecentCommentComponent', () => {
  let component: RecentCommentComponent;
  let fixture: ComponentFixture<RecentCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
