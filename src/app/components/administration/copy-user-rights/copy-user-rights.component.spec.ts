import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyUserRightsComponent } from './copy-user-rights.component';

describe('CopyUserRightsComponent', () => {
  let component: CopyUserRightsComponent;
  let fixture: ComponentFixture<CopyUserRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyUserRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyUserRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
