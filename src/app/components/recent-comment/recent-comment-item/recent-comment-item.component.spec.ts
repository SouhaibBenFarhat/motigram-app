import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCommentItemComponent } from './recent-comment-item.component';

describe('RecentCommentItemComponent', () => {
  let component: RecentCommentItemComponent;
  let fixture: ComponentFixture<RecentCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
