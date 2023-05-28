import { component$, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import type { Post } from '~/interfaces/posts';

import Api from '~/services/api';
import styles from "./post.scss?inline";

export const usePost = routeLoader$(async (req) => {
  const api = new Api();
  const id = req.params.id;
  let post: Post | undefined;
  let status: "loading" | "error" | "success" = "loading";

  try {
    post = await api.getPost(Number(id), {showContent: true});
    status = "success";
  } catch (err) {
    console.error(err);
    status = "error";
  }
  return { post, status };
});

export default component$(() => {
  useStylesScoped$(styles)
  const postData = usePost();

  useVisibleTask$(({ track }) => {
    track(() => postData.value);
    
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
      { postData.value.status === "success" && 
        <div id="content">
          <h1>{ postData.value.post?.title }</h1>
          <div dangerouslySetInnerHTML={postData.value.post?.content}/>
        </div>
      }
    </main>
  )
});

export const head: DocumentHead = ({ resolveValue }) => {
  const { post, status } = resolveValue(usePost); 
  let title = "Loading...";
  let desc = "Loading...";

  if(status === "success" && post) {
    title = post.title;
    desc = post.description;
  } else {
    title = "Error";
    desc = "Error loading content."
  }

  return {
    title: `${title} - M. Ouariachi`,
    meta: [
      {
        name: "description",
        content: `${desc}`,
      },
    ],
  }
};
