import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WordpressMediaResponseModel } from "../../model/responses/wordpress/wordpress-media-response.model";
import { filter, map } from "rxjs/operators";
import { WordpressPageResponseModel, WordpressPostResponseModel } from '../../model/responses/wordpress/wordpress-response.model';
import { WordpressCategoryEnum } from "../../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../../dictionary/wordpress-tag.enum";
import { WordpressPage } from '../../dictionary/wordpress-page.enum';

@Injectable()
export class WordpressService {
  constructor(private httpClient: HttpClient) {}

  public getPostCollectionByCategoryAndTag$(
    categoryId: WordpressCategoryEnum,
    tagId: WordpressTagEnum
  ): Observable<WordpressPostResponseModel[]> {
    return this.httpClient
      .get<WordpressPostResponseModel[]>(
        `https://www.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}&tags=${tagId}`
      )
      .pipe(filter((posts) => !!posts && posts.length > 0));
  }

  public getWordpressPostByCategoryAndTag$(
    categoryId: WordpressCategoryEnum,
    tagId: WordpressTagEnum
  ): Observable<WordpressPostResponseModel> {
    return this.httpClient
      .get<WordpressPostResponseModel[]>(
        `https://www.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}&tags=${tagId}`
      )
      .pipe(
        filter((posts) => !!posts && posts.length > 0),
        map((posts) => posts[0])
      );
  }

  public getWordpressPageById(
    page: WordpressPage
  ): Observable<WordpressPostResponseModel> {
    return this.httpClient
      .get<WordpressPageResponseModel>(
        `https://www.66er.net/wp-json/wp/v2/pages/${page}?_embed`
      )
      .pipe(
        map((posts) => posts)
      );
  }

  public getMediaCollectionForTag$(categoryName: string): Observable<WordpressMediaResponseModel[]> {
    return this.httpClient.get<WordpressMediaResponseModel[]>(
      `https://www.66er.net/wp-json/wp/v2/media?search=${categoryName}`
    );
  }
}
