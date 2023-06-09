import { component$, useComputed$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';

export const usePokemonList = routeLoader$<SmallPokemon[]>( async({ query, redirect, pathname }) => {

  const offset = Number( query.get('offset') || '0' );

  if( offset < 0 || isNaN( offset ) ) redirect(301, pathname);

  return await getSmallPokemons(offset);

});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$<number>( () => {
    const offsetString = new URLSearchParams( location.url.search );
    return Number( offsetString.get('offset') || 0 );
  });

  return (
    <>  
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="mt-1">Current offset: { currentOffset }</span>
        <span class="mt-1">Loading page: { location.isNavigating ? 'Yes' : 'No' }</span>  
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }`} class="btn btn-primary mr-2">Previous</Link>
        <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`} class="btn btn-primary mr-2">Next</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        { pokemons.value.map( ({ name, id }) => (
          <div key={ name } class="m-5 flex flex-col justify-center text-center">
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
  title: 'SSR List',
  meta: [
    {
      name: 'description',
      content: 'Qwik Poke App',
    },
  ],
};
