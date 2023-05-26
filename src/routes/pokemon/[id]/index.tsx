import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$} from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

// ? El routeLoader se ejecuta antes de renderizar el componente
export const usePokemonId = routeLoader$<number>( ({ params, redirect }) => {

  const id = Number(params.id);

  if( isNaN( id ) ) redirect(301, '/');
  if( id <= 0 || id >= 1000 ) redirect(301, '/');

  return id;

}); 

export default component$(() => {

  // * Con routeLoader
  const id = usePokemonId();

  const {
    isVisible,
    showBackImage,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame();

  return (
    <>
        <span class="text-5xl">Pokemon: { id.value }</span>
        <PokemonImage id={ id.value } isVisible={ isVisible.value } backImage={ showBackImage.value } />
        <div class="mt-2">
          <button onClick$={ toggleFromBack } class="btn btn-primary">Turn around</button>
          <button onClick$={ toggleVisible } class="btn btn-primary">Show Pokemon</button>
      </div>
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