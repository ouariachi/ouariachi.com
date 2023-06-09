import type { LangContent } from "~/interfaces/lang";

export const Es: LangContent = {
  header: {
    links: {
      about: "Sobre mí",
      blog: "Blog",
      contact: "Contacto",
      home: "Inicio",
      portfolio: "Portafolio"
    }
  },
  home: {
    hero: {
      title: "¡Hola 👋! Soy Mohamed.",
      info: "Desarrollador web en constante evolución, en busca de dominar tecnologías y enriquecer mis habilidades. Creatividad, innovación y crecimiento personal en cada proyecto.",
      resume: "Currículum"
    },
    about: {
      title: "Sobre mí",
      content: [
        "¡Hola! Soy Mohamed, un apasionado programador web y móvil con una sólida formación autodidacta y <a href='/portfolio'>proyectos</a> personales que respaldan mi experiencia. Me he especializado en la programación web utilizando principalmente JavaScript. También, tengo conocimientos sólidos en PHP, HTML5, CSS3 y otros lenguajes y tecnologías relacionadas. Mi enfoque principal siempre ha sido crear soluciones útiles y efectivas que brinden una gran experiencia al usuario final.",
        "Además, puedo desarrollar aplicaciones móviles para Android e iOS utilizando el poderoso Ionic Framework. Aunque hasta ahora he trabajado de forma independiente, estoy ansioso por unirme a un equipo colaborativo para seguir creciendo y aprendiendo. Estoy entusiasmado por llevar mis habilidades y conocimientos al siguiente nivel en mi primer empleo profesional. Si estás buscando un programador apasionado y comprometido que pueda materializar tus ideas digitales, ¡contáctame y trabajemos juntos para lograrlo!"
      ]
    },
    blog: {
      title: "Blog",
      subtitle: "Mis últimas publicaciones. (Solo en español)",
      error: "¡Ups! No se han podido cargar las últimas publicaciones."
    }
  },
  blog: {
    usePostsError: "¡Ups! No se han podido cargar las publicaciones."
  },
  portfolio: {
    title: "Mis proyectos",
    projects: {
      ticTacToe: {
        title: "Tres en raya",
        description: "Una app simple para jugar al tres en raya hecho en React."
      },
      ouariachi: {
        title: "Ouariachi.com",
        description: "Esta página web. Hecha en Qwik (Qwik City)."
      },
      authApi: {
        title: "Auth Api",
        description: "Una API sencilla con la que los usuarios pueden registrarse y autorizarse."
      }
    }
  }
};

export const En: LangContent = {
  header: {
    links: {
      about: "About me",
      blog: "Blog",
      contact: "Contact",
      home: "Home",
      portfolio: "Portfolio"
    }
  },
  home: {
    hero: {
      title: "Hi 👋! I'm Mohamed.",
      info: "Web developer in constant evolution, striving to master technologies and enrich my skills. Creativity, innovation, and personal growth in every project.",
      resume: "Resume"
    },
    about: {
      title: "About me",
      content: [
        "Hello! I'm Mohamed, a passionate web and mobile programmer with a solid self-taught background and personal <a href='/portfolio'>projects</a> that showcase my experience. I have specialized in web programming, primarily using JavaScript. I also have solid knowledge in PHP, HTML5, CSS3, and other related languages and technologies. My primary focus has always been on creating useful and effective solutions that deliver a great user experience.",
        "In addition, I can develop mobile applications for Android and iOS using the powerful Ionic Framework. Although I have primarily worked independently thus far, I am eager to join a collaborative team to continue growing and learning. I am excited to take my skills and knowledge to the next level in my first professional position. If you're seeking a passionate and dedicated programmer who can bring your digital ideas to life, please don't hesitate to reach out. Let's work together to make it happen!"
      ]
    },
    blog: {
      title: "Blog",
      subtitle: "My latest posts. (Spanish only)",
      error: "Ups! The latest posts couldn't be loaded."
    }
  },
  blog: {
    usePostsError: "Ups! The posts couldn't be loaded."
  },
  portfolio: {
    title: "My projecs",
    projects: {
      ticTacToe: {
        title: "Tic-Tac-Toe",
        description: "An simple app for playing tic-tac-toe made with React."
      },
      ouariachi: {
        title: "Ouariachi.com",
        description: "This web page. Made in Qwik (Qwik City)."
      },
      authApi: {
        title: "Auth Api",
        description: "A simple API with which users can register and authorize."
      }
    }
  }
};