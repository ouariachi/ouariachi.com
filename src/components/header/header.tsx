import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";

import { ThemeContext } from "~/context/theme";
import { LangContext } from "~/context/lang";

import { LuMoonStar, LuSun } from "../icons/Lucide";
import { FEngland, FSpain } from "../icons/Flags";

import headerStyles from "./header.scss?inline";

export default component$(() => {
  useStylesScoped$(headerStyles);
  const nav = useNavigate();
  const theme = useContext(ThemeContext);
  const lang = useContext(LangContext);

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme.value);
  });

  const toggleLang = $(() => {
    lang.code = lang.code === "es" ? "en" : "es"
    localStorage.setItem("lang", lang.code);
  });

  return (
    <header id="main-header">
      <span class="brand" onClick$={() => nav("/")}>Ouariachi</span>
      <div class="links">
        <span><Link href="/">{ lang.content.header.links.home }</Link></span>
        <span><Link href="/portfolio">{ lang.content.header.links.portfolio }</Link></span>
        <span><Link href="/blog">{ lang.content.header.links.blog }</Link></span>
        <span><a href="/#about">{ lang.content.header.links.about }</a></span>
        <span><a href="/#contact">{ lang.content.header.links.contact }</a></span>
      </div>
      <div class="buttons">
        <div class="btn theme" onClick$={toggleTheme}>
          { theme.value === "dark" ? <LuMoonStar /> : <LuSun />}
        </div>
        <div class="btn flag" onClick$={toggleLang}>
          { lang.code === "es" ? <FSpain /> : <FEngland /> }
        </div>
      </div>
    </header>
  )
});