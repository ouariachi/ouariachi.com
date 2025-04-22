import { defineMiddleware } from 'astro/middleware';
import { redirectToDefaultLocale, pathHasLocale } from 'astro:i18n';

// i18n manual routing requires a middleware file.
export const onRequest = defineMiddleware((ctx, next) => {
  return next();
});