import { component$ } from '@builder.io/qwik';
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