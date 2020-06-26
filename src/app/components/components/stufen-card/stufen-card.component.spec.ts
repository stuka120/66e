import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StufenCardComponent } from "./stufen-card.component";

describe("StufenCardComponent", () => {
  let component: StufenCardComponent;
  let fixture: ComponentFixture<StufenCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StufenCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
