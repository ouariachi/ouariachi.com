import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, useLocation } from '@builder.io/qwik-city';
import type { Post } from '~/interfaces/posts';

import Api from '~/services/api';
import styles from "./post.scss?inline";

export default component$(() => {
  useStylesScoped$(styles)
  const loc = useLocation();
  const { id } = loc.params;
  const post = useSignal<Post>();
  const postStatus = useSignal<"loading" | "error" | "success">("loading")

  useVisibleTask$(() => {
    const api = new Api();
    api.getPost(Number(id), {showContent: true})
      .then(data => {
        post.value = data;
        postStatus.value = "success";
        document.title = data.title + " - Ouariachi";
        document.querySelector("meta[name=description]")?.setAttribute("content", post.value.description);
      })
      .catch(err => {
        postStatus.value = "error";
        console.error(err)
      });
  });

  useVisibleTask$(({ track }) => {
    track(() => post.value);
    
    const script = document.createElement("script");
    script.innerHTML = `
      document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
      });
    `;
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  });

  return (
    <main id="post">
      { postStatus.value === "success" && 
        <div id="content">
          <h1>{ post.value?.title }</h1>
          <div dangerouslySetInnerHTML={post.value?.content}/>
        </div>
      }
      
    </main>
  )
});

export const head: DocumentHead = {
  title: "Loading...",
  meta: [
    {
      name: "description",
      content: "Mohamed Mohamed el Ouariachi's personal website and portfolio.",
    },
  ],
};
