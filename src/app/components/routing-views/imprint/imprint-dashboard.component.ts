import { Component } from '@angular/core';
import { WordpressService } from '../../../shared/services/wordpress/wordpress.service';
import { Observable } from 'rxjs';
import { WordpressPageResponseModel } from '../../../shared/model/responses/wordpress/wordpress-response.model';
import { WordpressPage } from '../../../shared/dictionary/wordpress-page.enum';

@Component({
  templateUrl: "./imprint-dashboard.component.html",
  styleUrls: ["./imprint-dashboard.component.css"]
})
export class ImprintDashboardComponent {

  content$: Observable<WordpressPageResponseModel>

  constructor(private wordpressService: WordpressService) {
    this.content$ = this.wordpressService.getWordpressPageById(WordpressPage.Impressum)
  }
}
