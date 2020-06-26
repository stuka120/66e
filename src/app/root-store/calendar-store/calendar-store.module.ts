import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./reducer";

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature("calendar", reducer)]
})
export class CalendarStoreModule {}
