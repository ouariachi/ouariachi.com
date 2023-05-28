import { component$, Slot } from '@builder.io/qwik';
import Alert from '~/components/alert';
import Header from '~/components/header/header';

export default component$(() => {
  return (
    <>
      <Alert id="alert-dev">
        Esta página web está en desarrollo. 💻
      </Alert>
      <Header />
      <Slot />
    </>
  );
});
