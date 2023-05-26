import { component$, useContext, useStylesScoped$} from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useNavigate } from '@builder.io/qwik-city';

import homeStyles from "./home.scss?inline";
import { LangContext } from '~/context/lang';
import { LuDownload } from '~/components/icons/Lucide';
import Api from '~/services/api';
import type { Post } from '~/interfaces/posts';

export const useLatestPosts = routeLoader$(async () => {
  let latestPosts: Post[] = [];
  let status: "success" | "error" = "error";
  const api = new Api();
  
  try {
    const { posts } = await api.getAllPosts({page: 1, perPage: 5, showContent: false});
    latestPosts = posts;
    status = "success";
  } catch (err) {
    status = "error";
    console.error(err)
  }  

  return {posts: latestPosts, status};
});

export default component$(() => {
  useStylesScoped$(homeStyles);
  const nav = useNavigate();
  const lang = useContext(LangContext);
  const latestPosts = useLatestPosts();
  
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
        { latestPosts.value.status === "success" && 
          <div class="content">
            {latestPosts.value.posts.map((post, key) => (
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
        
        {/* POSTS ERROR */}
        { latestPosts.value.status === "error" && 
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
