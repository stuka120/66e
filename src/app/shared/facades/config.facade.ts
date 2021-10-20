import { Injectable } from "@angular/core";
import { ConfigurationService } from "../services/configuration/configuration.service";
import { Observable } from "rxjs";
import { AlertComponentModel } from "../../components/components/alert/alert.component-model";
import { filter, map } from "rxjs/operators";
import { InfoBannerModel } from "../model/config/app.config";
import { isNotNullOrUndefined } from "../utils/rxjs/predicate/filter-is-not-null-or-empty.util";

@Injectable({
  providedIn: "root"
})
export class ConfigFacade {
  constructor(private configurationService: ConfigurationService) {}

  getAlertModel$(): Observable<AlertComponentModel> {
    return this.configurationService.getConfig$().pipe(
      map((config) => config.dangerBanner),
      filter(isNotNullOrUndefined),
      map(mapToAlertComponentModel)
    );

    function mapToAlertComponentModel(infoBannerModel: InfoBannerModel): AlertComponentModel {
      let alertComponentModel: AlertComponentModel = {
        isActive: infoBannerModel.active,
        alertMode: infoBannerModel.mode,
        presentationMode: infoBannerModel.presentationMode,
        bodyText: infoBannerModel.bodyText,
        headlineText: infoBannerModel.headerText
      };

      if (!!infoBannerModel.expandableSection) {
        alertComponentModel.expandableSection = {
          expandableText: infoBannerModel.expandableSection.expandableText,
          expandButtonText: infoBannerModel.expandableSection.expandButtonText,
          collapseButtonText: infoBannerModel.expandableSection.collapseButtonText
        };
      }

      return alertComponentModel;
    }
  }
}
