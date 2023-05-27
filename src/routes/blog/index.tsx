import { component$, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

import styles from "./blog.scss?inline";

export const usePosts = routeAction$(() => {
  return {
    test: "hola"
  }
});

export default component$(() => {
  useStylesScoped$(styles);
  const posts = usePosts();
  posts.submit()

  useVisibleTask$(({ track }) => {
    track(() => posts.value);
    console.log(posts.value)
  });

  return (
    <main id="blog">
      <h1>Últimas publicaciones</h1>

    </main>      
  )
});