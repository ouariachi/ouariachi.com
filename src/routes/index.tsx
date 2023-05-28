import { component$, useContext, useSignal, useStylesScoped$, useVisibleTask$} from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import homeStyles from "./home.scss?inline";
import { LangContext } from '~/context/lang';
import { LuDownload, LuLoader } from '~/components/icons/Lucide';
import Api from '~/services/api';
import type { Post } from '~/interfaces/posts';

async function getLatestPosts() {
  const api = new Api();
  try {
    const { posts } = await api.getPosts({ 
      page: 1, 
      perPage: 5, 
      order: "date", 
      direction: "desc"
    });
    return { posts, success: true };
  } catch (error) {
    return { success: false, error}
  }
}

export default component$(() => {
  useStylesScoped$(homeStyles);
  const nav = useNavigate();
  const lang = useContext(LangContext);
  const latestPosts = useSignal<Post[]>([]);
  const latestPostsStatus = useSignal<"loading" | "success" | "error">("loading");

  useVisibleTask$(() => {
    getLatestPosts()
      .then(({ success, posts}) => {
        if(success && posts) {
          latestPosts.value = posts;
          latestPostsStatus.value = "success";
        } else {
          latestPostsStatus.value = "error";
        }
      });
  });
  
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

      <section id="blog">
        <h1> { lang.content.home.blog.title } </h1>
        <p> { lang.content.home.blog.subtitle } </p>

        {/* POSTS LOADED */}
        { latestPostsStatus.value === "success" && 
          <div class="content">
            {latestPosts.value.map((post, key) => (
              <article key={key}>
                <header onClick$={() => nav("/blog/post/" + post.id)}>{ post.title }</header>
                <footer> { post.date.toLocaleDateString() } </footer>
              </article>
            ))}

            <div class="btn" onClick$={() => nav("/blog")}>
              Ver todos
            </div>
          </div>
        }
        
        {/* POSTS LOADING */}
        { latestPostsStatus.value === "loading" && 
          <div class="loading"> <LuLoader /> </div>
        }

        {/* POSTS ERROR */}
        { latestPostsStatus.value === "error" && 
          <div class="error">
            { lang.content.home.blog.error }
          </div>
        }
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
