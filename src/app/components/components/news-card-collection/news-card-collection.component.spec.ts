import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { NewsCardCollectionComponent } from "./news-card-collection.component";

describe("NewsCardCollectionComponent", () => {
  let component: NewsCardCollectionComponent;
  let fixture: ComponentFixture<NewsCardCollectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCardCollectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
