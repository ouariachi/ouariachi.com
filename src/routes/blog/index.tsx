import { $, component$, useContext, useSignal, useStylesScoped$, useVisibleTask$} from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import styles from "./blog.scss?inline";
import Api from "~/services/api";
import { LangContext } from "~/context/lang";
import type { Post } from "~/interfaces/posts";
import { LuLoader } from "~/components/icons/Lucide";

async function getPage(page: number) {
  const api = new Api();
  try {
    const { posts, pages_left } = await api.getPosts({ 
      page, 
      perPage: 10, 
      order: "date", 
      direction: "desc"
    });
    return { posts, pages_left, success: true };
  } catch (error) {
    return { success: false, error}
  }
}

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const lang = useContext(LangContext);

  const posts = useSignal<Post[]>([]);
  const page = useSignal(1);
  const lastPage = useSignal(true);
  const pageStatus = useSignal<"loading" | "success" | "error">("loading");

  const loadPage = $(async (pageToLoad: number) => {
    pageStatus.value = "loading";
    const data = await getPage(pageToLoad);
    
    if(data.success === true) {
      pageStatus.value = "success";

      if(data.posts && data.posts.length > 0){
        page.value = pageToLoad;
        posts.value = data.posts;
      }

      if(!data.pages_left) {
        lastPage.value = true;
      } else {
        lastPage.value = false;
      }
    } else {
      pageStatus.value = "error";
    }
  });

  useVisibleTask$(() => {
    loadPage(1);
  });

  return (
    <main id="blog">
      <div class="left">
        <h1>Mis publicaciones</h1>
        
        { pageStatus.value === "loading" && 
          <div class="loading"> <LuLoader /> </div>
        }

        { pageStatus.value === "error" && 
          <span class="error"> { lang.content.blog.usePostsError } </span>
        }

        <div class="posts">
          { pageStatus.value === "success" && posts.value.map((post, i) => (
            <article key={i} onClick$={() => nav("post/" + post.id)}>
              <header> { post.title } </header>
              { post.description }
              <footer> { post.date.toLocaleDateString() } </footer>
            </article>
          ))}
        </div>

        <div class="buttons">
          { page.value > 1 && 
            <button onClick$={() => loadPage(page.value - 1)}>
              {"<<"}
            </button>
          }
          
          { (page.value > 1 || lastPage.value === false) &&
            <span>Página: { page.value }</span>
          }
          
          { lastPage.value === false && 
            <button onClick$={() => loadPage(page.value + 1)}>
              {">>"}
            </button>
          }
        </div>
      </div>
        
      <div class="right">
        { /* Buscador */ }
      </div>
    </main>      
  )
});

export const head: DocumentHead = {
  title: "Blog - M. Ouariachi",
  meta: [
    {
      name: "description",
      content: "Mohamed Mohamed el Ouariachi's blog.",
    },
  ],
}