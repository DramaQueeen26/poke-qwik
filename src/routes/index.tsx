/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {
  
  const pokemonId = useSignal<number>(1); // * Para primitivos: Booleans, strings, numbers
  const showBackImage = useSignal<boolean>(false);
  const showPokemon = useSignal<boolean>(true);

  // * Se le llama QRL
  const chagePokemonId = $(( value: number ) => {

    if( pokemonId.value + value <= 0 ) return;

    pokemonId.value += value;

  });

  useTask$( ({ track }) => {
    track( () => pokemonId.value );
    showPokemon.value = true;
  });

  return (
    <>
      <span class="text-2xl">Search</span>
      <span class="text-9xl">{ pokemonId }</span>

      

     <PokemonImage 
      id={ pokemonId.value } 
      backImage = { showBackImage.value } 
      isVisible={ showPokemon.value } 
      />

      <div class="mt-2">
        <button onClick$={ () => chagePokemonId(-1) } class="btn btn-primary">Prev</button>
        <button onClick$={ () => chagePokemonId(+1) } class="btn btn-primary">Next</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class="btn btn-primary">Turn around</button>
        <button onClick$={ () => showPokemon.value = false } class="btn btn-primary">Show Pokemon</button>
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
