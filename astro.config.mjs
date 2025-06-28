// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://ouariachi.com",
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    routing: "manual"
  },
  vite: {
    base: "/",
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['ouariachi.com', 'www.ouariachi.com']
    },
    preview: {
      allowedHosts: ['ouariachi.com', 'www.ouariachi.com']
    }
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
    }
  }
});