import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DownloadModel } from "../../../shared/model/responses/wordpress/wordpress-media-response.model";
import { DownloadsFacade } from "../../../shared/facades/downloads/downloads.facade";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads-dashboard.component.html",
  styleUrls: ["./downloads-dashboard.component.css"]
})
export class DownloadsDashboardComponent implements OnInit {
  currentDownloads$: Observable<DownloadModel[]>;

  constructor(private downloadsFacade: DownloadsFacade) {}

  ngOnInit() {
    this.currentDownloads$ = this.downloadsFacade.currentDownloads$();
  }
}
