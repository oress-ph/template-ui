import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightDetailComponent } from './user-right-detail.component';

describe('UserRightDetailComponent', () => {
  let component: UserRightDetailComponent;
  let fixture: ComponentFixture<UserRightDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRightDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
