import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { StufenCardCollectionComponent } from "./stufen-card-collection.component";

describe("StufenCardCollectionComponent", () => {
  let component: StufenCardCollectionComponent;
  let fixture: ComponentFixture<StufenCardCollectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StufenCardCollectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
