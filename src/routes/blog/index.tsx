import { component$, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$ } from "@builder.io/qwik-city";

import styles from "./blog.scss?inline";

export const usePosts = routeAction$(() => {
  return {
    test: "hola"
  }
});

export default component$(() => {
  useStylesScoped$(styles);
  const posts = usePosts();

  useVisibleTask$(({ track }) => {
    track(() => posts.value);
    console.log(posts.value)
  });

  return (
    <main id="blog">
      <h1>Últimas publicaciones</h1>
      <div onClick$={() => posts.submit()}>Cargar</div>
    </main>      
  )
});

export const header: DocumentHead = {
  title: "Blog - M. Ouariachi",
  meta: [
    {
      name: "description",
      content: "Mohamed Mohamed el Ouariachi's blog.",
    },
  ],
}