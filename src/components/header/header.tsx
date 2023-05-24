import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

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
      <div class="links">
        <span class="brand" onClick$={() => nav("/")}>Ouariachi</span>
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