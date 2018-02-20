import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSmallItemComponent } from './post-small-item.component';

describe('PostSmallItemComponent', () => {
  let component: PostSmallItemComponent;
  let fixture: ComponentFixture<PostSmallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSmallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSmallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
