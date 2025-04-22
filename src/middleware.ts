import { defineMiddleware } from 'astro/middleware';
import { redirectToDefaultLocale, pathHasLocale } from 'astro:i18n';

export const onRequest = defineMiddleware((ctx, next) => {
  const { pathname } = ctx.url;
  if (pathHasLocale(pathname)) {
    return next();
  } else {
    return redirectToDefaultLocale(ctx, 302);
  }
});