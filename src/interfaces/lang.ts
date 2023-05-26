export interface LangContent {
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
  }
}
export type LangCode = "es" | "en";
export type Lang = {code: LangCode, content: LangContent};