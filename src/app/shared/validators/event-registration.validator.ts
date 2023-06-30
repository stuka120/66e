import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, UntypedFormGroup, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
// @ts-ignore
export class EventRegistrationAsyncValidator {
  constructor(private httpClient: HttpClient) {}

  validator(): AsyncValidatorFn {
    return (formGroup: UntypedFormGroup): Observable<ValidationErrors | null> => {
      const firstName = formGroup.controls.firstname.value;
      const lastName = formGroup.controls.lastname.value;
      const email = formGroup.controls.contactEmail.value;

      return of(null);
    };
  }
}
