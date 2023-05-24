import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>Hola mundo</>
  );
});

export const head: DocumentHead = {
  title: 'Client List',
  meta: [
    {
      name: 'description',
      content: 'Qwik Poke App',
    },
  ],
};