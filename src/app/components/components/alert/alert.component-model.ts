export interface AlertComponentModel {
  isActive: boolean;
  headerText?: string;
  bodyText: string;
  alertMode: AlertModes;
  presentationMode: PresentationModes;
}

export type AlertModes = "info" | "danger";
export type PresentationModes = "overlay" | "insert";