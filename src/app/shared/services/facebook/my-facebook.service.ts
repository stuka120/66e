import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  WordpressPostResponseModel,
  PostCollectionResponseModel
} from "../../model/responses/wordpress/wordpress-post-response.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MyFacebookService {
  constructor(private httpClient: HttpClient) {}

  public getPosts$(): Observable<WordpressPostResponseModel[]> {
    return this.httpClient
      .get<PostCollectionResponseModel>("https://www.66er.net/wp-json/66er/v1/feed")
      .pipe(map((postReponse) => postReponse.data));
  }
}
