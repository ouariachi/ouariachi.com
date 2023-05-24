import { component$, useContextProvider, useSignal, useStore, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import global from './theme/global.scss?inline';
import { type Theme, ThemeContext } from './context/theme';
import { LangContext } from './context/lang';
import { En, Es } from './services/lang';
import type { Lang, LangCode } from './interfaces/lang';

export default component$(() => {
  useStyles$(global);

  /**
   * THEME CONTEXT
   */
  const theme: Theme = useSignal("light");
  useContextProvider(ThemeContext, theme);

  // Load saved theme and listen to theme changes
  useVisibleTask$(_ => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener('change', e => {
      localStorage.removeItem("theme");
      theme.value = e.matches ? "light" : "dark";
    });
    
    const themeStored = localStorage.getItem("theme") as "light" | "dark";
    if(themeStored) {
      theme.value = themeStored;
      return;
    }

    theme.value = media.matches ? "light" : "dark";
  });

  // handle theme changes
  useVisibleTask$(({ track }) => {
    track(() => theme.value);
    document.documentElement.setAttribute("theme", theme.value);
  });
  
  /**
   * LANG CONTEXT
   */
  const lang: Lang = useStore({code: "es", content: Es});
  useContextProvider(LangContext, lang);

  // load saved language
  useVisibleTask$(_ => {
    const langStored = localStorage.getItem("lang") as LangCode;
    if(langStored) {
      lang.code = langStored;
      return;
    } 
    
    const navigatorLang = navigator.language || "es-ES";
    switch (true) {
      case (/es([-])?([a-zA-Z0-9]+)?/gm).test(navigatorLang): { // Spanish
        lang.code = "es";
        break;
      } 
      case (/en([-])?([a-zA-Z0-9]+)?/gm.test(navigatorLang))://English
      default: {
        lang.code = "en";
        break;
      } 
    }
  });

  // handle language changes
  useVisibleTask$(({ track }) => {
    track(() => lang.code);
    switch(lang.code){
      case "es": lang.content = Es; break;
      case "en": lang.content = En; break; 
    }
  }); 

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="es-ES">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
