/* eslint-disable qwik/jsx-img */
import { $, component$, useContext, useTask$ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  // * Cambiando las señales por el context
  const pokemonGame = useContext( PokemonGameContext );

  // * Se le llama QRL
  const chagePokemonId = $(( value: number ) => {

    if( pokemonGame.pokemonId + value <= 0 ) return;

    pokemonGame.pokemonId += value;

  });

  useTask$( ({ track }) => {
    track( () => pokemonGame.pokemonId );
    pokemonGame.isVisible = false;
  });

  const goToPokemon = useNavigate();

  return (
    <>
      <span class="text-2xl">Search</span>
      <span class="text-9xl">{ pokemonGame.pokemonId }</span>   

      <div onClick$={async () => {
        await goToPokemon(`/pokemon/${pokemonGame.pokemonId}`);
      }}>
        <PokemonImage 
            id={ pokemonGame.pokemonId } 
            backImage = { pokemonGame.showBackImage } 
            isVisible={ pokemonGame.isVisible } 
          />
      </div>

      <div class="mt-2">
        <button onClick$={ () => chagePokemonId(-1) } class="btn btn-primary">Prev</button>
        <button onClick$={ () => chagePokemonId(+1) } class="btn btn-primary">Next</button>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary">Turn around</button>
        <button onClick$={ () => pokemonGame.isVisible = true } class="btn btn-primary">Show Pokemon</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik Poke App',
    },
  ],
};
