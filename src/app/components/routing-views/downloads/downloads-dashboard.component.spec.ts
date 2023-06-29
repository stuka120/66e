import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DownloadsDashboardComponent } from "./downloads-dashboard.component";

describe("DownloadsComponent", () => {
  let component: DownloadsDashboardComponent;
  let fixture: ComponentFixture<DownloadsDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadsDashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
