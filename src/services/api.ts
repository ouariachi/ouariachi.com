import { ApiPostParams, ApiResult } from "../interfaces/api";
import { Post } from "../interfaces/posts";

type AllPostsPromiseResponse = {posts: Post[], pages_left?: number}

export default class Api {
  protected API_BASE_URL =  
    window.location.hostname === "localhost" ? 
      "http://127.0.1.1": // localhost api
      "https://api.ouariachi.com";

  getAllPosts(params?: ApiPostParams): Promise<AllPostsPromiseResponse> {
    let url = this.API_BASE_URL +  "/posts/?" + 
      (params?.showContent ? "content=1" : "content") +
      (params?.contentLang ? `&contentLang=${params.contentLang}` : "" ) +
      (params?.reponseType ? `&reponseType=${params.reponseType}` : "") +
      (params?.order ? `&order=${params.order}` : "") +
      (params?.direction ? `&direction=${params.direction}` : "") +
      (params?.page ? `&page=${params.page}` : "1") +
      (params?.perPage ? `&per_page=${params.perPage}` : "10");

    return new Promise<AllPostsPromiseResponse>(async (resolve, reject) => {
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
    let url = this.API_BASE_URL +  `/posts/${id}?` + 
    (params?.showContent ? "content=1" : "content") +
    (params?.contentLang ? `&contentLang=${params?.contentLang}` : "" ) +
    (params?.reponseType ? `&reponseType=${params?.reponseType}` : "");

    return new Promise<Post>(async (resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(reason => reject(reason));
    });
  }
}