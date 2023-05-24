import { component$, useContext, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import homeStyles from "./home.scss?inline";
import { LangContext } from '~/context/lang';
import { LuDownload } from '~/components/icons/Lucide';

export default component$(() => {
  useStylesScoped$(homeStyles);
  const lang = useContext(LangContext);

  return (
    <main id="home">
      <section id="hero">
        <div class="content">
          <div class="left">
            <h1>{ lang.content.home.hero.title }</h1>
            <p>{ lang.content.home.hero.info }</p>
            <a href={`/mohamed-cv-${lang.code}.pdf`} target="_blank" rel="noopener noreferrer nofollow">
              { lang.content.home.hero.resume }
              <LuDownload />
            </a>
          </div>
          <div class="right">
            <img src="/images/snorlax.png" alt="Snorlax IA" title="My mood on weekends 😂"/>
          </div>
        </div>
      </section>

      <section id="about">
        <h1>{ lang.content.home.about.title }</h1>
        <div class="content">
          <div class="left">
            <img src="/images/mohamed.png" alt="Mohamed Mohamed el Ouariachi" title='Me 🥰' />
          </div>
          <div class="right">
            { lang.content.home.about.content.map((str, i) => <p key={i} dangerouslySetInnerHTML={str} />) }
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "M. Ouariachi",
  meta: [
    {
      name: "description",
      content: "Mohamed Mohamed el Ouariachi's personal website and portfolio.",
    },
  ],
};
