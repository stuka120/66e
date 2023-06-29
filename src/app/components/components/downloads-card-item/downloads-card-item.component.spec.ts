import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DownloadsCardItemComponent } from "./downloads-card-item.component";

describe("DownloadsCardItemComponent", () => {
  let component: DownloadsCardItemComponent;
  let fixture: ComponentFixture<DownloadsCardItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadsCardItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
