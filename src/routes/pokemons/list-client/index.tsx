import { $, component$, useOnDocument, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {

  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: []
  });

  useVisibleTask$( async({ track }) => {

    track( () => pokemonState.currentPage );

    const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30 );
    pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons ];

  });

  useOnDocument( 'scroll', $( ()  => {
    
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if( ( currentScroll + 200 ) >= maxScroll ) {
      pokemonState.currentPage++;
    }

  }));

  return (
    <>  
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="mt-1">Current offset: { pokemonState.currentPage }</span>
        <span class="mt-1">Loading page: </span>  
      </div>

      <div class="mt-10">
        {/* <button 
          onClick$={ () => pokemonState.currentPage--}
          class="btn btn-primary mr-2">Previous</button> */}
        <button
          onClick$={ () => pokemonState.currentPage++}
          class="btn btn-primary mr-2">Next</button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        { pokemonState.pokemons.map( ({ name, id }) => (
          <div key={ name } class="m-5 flex flex-col justify-center">
            <PokemonImage id={ id } isVisible={ true } />
            <span class="capitalize">{ name }</span>
          </div>
        ))}
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