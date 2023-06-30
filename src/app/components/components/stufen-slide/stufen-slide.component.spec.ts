import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { StufenSlideComponent } from "./stufen-slide.component";

describe("StufenSlideComponent", () => {
  let component: StufenSlideComponent;
  let fixture: ComponentFixture<StufenSlideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StufenSlideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
