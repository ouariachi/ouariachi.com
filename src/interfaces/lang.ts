export interface LangContent {
  home: {
    about: {
      title: string,
      content: string[]
    }
  }
}
export type LangCode = "es" | "en";
export type Lang = {code: LangCode, content: LangContent};