import { Injectable } from "@angular/core";
import { WordpressService } from "../../services/wordpress/wordpress.service";
import { Observable } from "rxjs";
import {
  DownloadModel,
  WordpressMediaResponseModel
} from "../../model/responses/wordpress/wordpress-media-response.model";
import { filter, map } from "rxjs/operators";
import { WordpressDownloadTagEnum } from "../../dictionary/wordpress-download-tag.enum";
import { removeHtmlTags } from "../../utils/html-string/remove-html-tags.util";
import { collectionIsNotEmpty } from "../../utils/rxjs/predicate/filter-collection-is-not-empty.util";
import { Memoize } from 'typescript-memoize';

@Injectable({
  providedIn: "root"
})
export class DownloadsFacade {
  constructor(private wordpressService: WordpressService) {}

  @Memoize()
  currentDownloads$(): Observable<DownloadModel[]> {
    return this.getDownloadsByTagName(WordpressDownloadTagEnum.Aktuelles);
  }

  getDownloadsByTagName(tagName: WordpressDownloadTagEnum): Observable<DownloadModel[]> {
    return this.wordpressService
      .getMediaCollectionForTag$(tagName)
      .pipe(
        filter(collectionIsNotEmpty), // TODO: Check why this is needed
        map(mapToDownloadModels)
      );

    function mapToDownloadModels(wordpressMediaResponseDtoCollection: WordpressMediaResponseModel[]) {
      return wordpressMediaResponseDtoCollection.map(mapToDownloadModelItem);

      function mapToDownloadModelItem(dto: WordpressMediaResponseModel): DownloadModel {
        return {
          id: dto.id,
          isVisible: true,
          fileName: removeHtmlTags(dto.title.rendered),
          title: removeHtmlTags(dto.caption.rendered),
          mime_type: dto.mime_type,
          source_url: dto.source_url
        };
      }
    }
  }
}
