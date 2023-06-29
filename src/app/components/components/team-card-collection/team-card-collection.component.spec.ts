import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TeamCardCollectionComponent } from "./team-card-collection.component";

describe("TeamCardCollectionComponent", () => {
  let component: TeamCardCollectionComponent;
  let fixture: ComponentFixture<TeamCardCollectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardCollectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
