export interface BasePost {
    id: number,
    title: string, 
    description: string,
    tags: string[],
    content?: string,
}

export interface FetchedPost extends BasePost {
    date: string
}

export interface Post extends BasePost{
    date: Date
}