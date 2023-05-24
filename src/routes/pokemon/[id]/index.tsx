import { component$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useParams = routeLoader$(async ({ params }) => {
  return params.id;
});
 

export default component$(() => {

  const params = useParams();

  return (
    <>
        <span class="text-5xl">Pokemon: { params }</span>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Pokemon Info',
  meta: [
    {
      name: 'description',
      content: 'Qwik Poke App',
    },
  ],
};