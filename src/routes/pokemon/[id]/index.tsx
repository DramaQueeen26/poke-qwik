import { component$ } from '@builder.io/qwik';
import { useLocation, type DocumentHead} from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';

export default component$(() => {

  const location = useLocation();
  const id = location.params.id;

  return (
    <>
        <span class="text-5xl">Pokemon: { id }</span>
        <PokemonImage id={ id } isVisible={ true } />
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