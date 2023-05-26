import type { FetchedPost } from "./posts"

export interface ApiPostParams {
    showContent?: boolean,
    contentLang?: "html" | "md",
    reponseType?: "json" | "xml",
    order?: "date",
    direction?: "asc" | "desc",
    page?: number,
    perPage?: number
}

export interface ApiResult {
    pages_left?: number,
    posts?: FetchedPost[]
}