//// PostResponseModel images
export interface WordpressPostResponseModel {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded: {
    "wp:featuredmedia": {
      id: number;
      title: {
        rendered: string;
      };
      media_details: {
        sizes: {
          thumbnail: ImageMediaResponse;
          medium: ImageMediaResponse;
          medium_large: ImageMediaResponse;
          large: ImageMediaResponse;
          full: ImageMediaResponse;
        };
      };
      source_url: string;
    }[];
  };
}

export interface WordpressPageResponseModel extends WordpressPostResponseModel {}

export interface ImageMediaResponse {
  width: number;
  height: number;
  source_url: string;
}
