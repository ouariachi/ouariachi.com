import type { ApiPostParams, ApiResult } from "../interfaces/api";
import type { Post } from "../interfaces/posts";

type AllPostsResponse = {posts: Post[], pages_left?: number};

export default class Api {
  protected API_BASE_URL = "https://api.ouariachi.com";
  // protected API_BASE_URL = "http://127.0.1.1";

  getAllPosts(params?: ApiPostParams): Promise<AllPostsResponse> {
    const url = this.API_BASE_URL +  "/posts/?" + 
      (params?.showContent ? "content=1" : "content") +
      (params?.contentLang ? `&contentLang=${params.contentLang}` : "" ) +
      (params?.reponseType ? `&reponseType=${params.reponseType}` : "") +
      (params?.order ? `&order=${params.order}` : "") +
      (params?.direction ? `&direction=${params.direction}` : "") +
      (params?.page ? `&page=${params.page}` : "1") +
      (params?.perPage ? `&per_page=${params.perPage}` : "10");

    return new Promise<AllPostsResponse>((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then((data: ApiResult) => {
          const fetched = data.posts;
          const posts: Post[] = [];
          
          fetched?.forEach(fetchedPost => {
            const post: Post = {
              id: fetchedPost.id,
              title: fetchedPost.title,
              description: fetchedPost.description,
              date: new Date(fetchedPost.date),
              tags: fetchedPost.tags
            }

            posts.push(post);
          });

          resolve({posts, pages_left: data?.pages_left});
        })
        .catch(reject);
    });
  }

  getPost(id: number, params?: ApiPostParams): Promise<Post> {
    const url = this.API_BASE_URL +  `/posts/${id}?` + 
      (params?.showContent ? "content=1" : "content") +
      (params?.contentLang ? `&contentLang=${params?.contentLang}` : "" ) +
      (params?.reponseType ? `&reponseType=${params?.reponseType}` : "");

    return new Promise<Post>((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(reason => reject(reason));
    });
  }
}