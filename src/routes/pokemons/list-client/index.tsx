import { component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

interface PokemonState {
  currentPage: number;
  pokemons: [];
}

export default component$(() => {

  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: []
  });

  return (
    <>  
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="mt-1">Current offset: { pokemonState.currentPage }</span>
        <span class="mt-1">Loading page: </span>  
      </div>

      <div class="mt-10">
        <button 
          onClick$={ () => pokemonState.currentPage--}
          class="btn btn-primary mr-2">Previous</button>
        <button
          onClick$={ () => pokemonState.currentPage++}
          class="btn btn-primary mr-2">Next</button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {/* { pokemons.value.map( ({ name, id }) => (
          <div key={ name } class="m-5 flex flex-col justify-center">
            <PokemonImage id={ id } isVisible={ true } />
            <span class="capitalize">{ name }</span>
          </div>
        ))} */}
      </div>
      <br /><br /><br />
    </>
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