/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {
  
  const pokemonId = useSignal<number>(1); // * Para primitivos: Booleans, strings, numbers

  // * Se le llama QRL
  const chagePokemonId = $(( value: number ) => {

    if( pokemonId.value + value <= 0 ) return;

    pokemonId.value += value;

  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId }</span>

      

     <PokemonImage id={ pokemonId.value } backImage />

      <div class="mt-2">
        <button onClick$={ () => chagePokemonId(-1) } class="btn btn-primary">Prev</button>
        <button onClick$={ () => chagePokemonId(+1) } class="btn btn-primary">Next</button>
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
