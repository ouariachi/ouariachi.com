export interface Project {
  title: string
  description: string
}

export interface LangContent {
  header: {
    links: {
      about: string,
      blog: string,
      contact: string, 
      home: string,
      portfolio: string
    }
  },
  home: {
    hero: {
      title: string,
      info: string,
      resume: string
    },
    about: {
      title: string,
      content: string[]
    },
    blog: {
      title: string,
      subtitle: string,
      error: string
    }
  },
  blog: {
    usePostsError: string
  },
  portfolio: {
    title: string
    projects: {
      ticTacToe: Project,
      ouariachi: Project
    }
  }
}
export type LangCode = "es" | "en";
export type Lang = {code: LangCode, content: LangContent};