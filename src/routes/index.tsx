import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import homeStyles from "./home.scss?inline";
import { LangContext } from '~/context/lang';

export default component$(() => {
  useStylesScoped$(homeStyles);
  const lang = useContext(LangContext);

  return (
    <main id='home'>
      <section id="hero">
        
      </section>

      <section id="about">
        <h1>{ lang.content.home.about.title }</h1>
        <div class="content">
          <div class="left">
            { lang.content.home.about.content.map((str, i) => <p key={i} dangerouslySetInnerHTML={str} />) }
          </div>
          <div class="right">
            <img src="/images/mohamed.png" alt="Mohamed Mohamed el Ouariachi" title='Me 🥰' />
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'M. Ouariachi',
  meta: [
    {
      name: 'description',
      content: "Mohamed Mohamed el Ouariachi's personal website and portfolio.",
    },
  ],
};
