import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import type { BasicPokemonInfo, PokemonListResponse } from '~/interfaces';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>( async() => {

  const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10');
  const data = await resp.json() as PokemonListResponse;

  return data.results;

});

export default component$(() => {

  const pokemons = usePokemonList();

  return (
    <>  
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="mt-1">Current offset:</span>
        <span class="mt-1">Loading page: </span>  
      </div>

      <div class="mt-10">
        <Link class="btn btn-primary mr-2">Previous</Link>
        <Link class="btn btn-primary mr-2">Next</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        { pokemons.value.map( ({ name }) => (
          <div key={ name } class="m-5 flex flex-col justify-center">
            <span class="capitalize">{ name }</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'SSR List',
  meta: [
    {
      name: 'description',
      content: 'Qwik Poke App',
    },
  ],
};