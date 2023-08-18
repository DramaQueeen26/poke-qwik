import { component$, useComputed$, useSignal, $, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getPokemonDetails } from '~/helpers/get-pokemon-details';

export const usePokemonList = routeLoader$<SmallPokemon[]>( async({ query, redirect, pathname }) => {

  const offset = Number( query.get('offset') || '0' );

  if( offset < 0 || isNaN( offset ) ) redirect(301, pathname);

  return await getSmallPokemons(offset);

});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal( false );
  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const pokemonDetails = useSignal('');

  // * Modal Functions
  const showModal = $(( id: string, name: string ) => {

    modalPokemon.id = id;
    modalPokemon.name = name;

    modalVisible.value = true;

  });

  const closeModal = $(() => {

    modalVisible.value = false;

  });

  useVisibleTask$(({ track }) => {

    track( () => modalPokemon.name );
    pokemonDetails.value = '';

    if( modalPokemon.name.length > 0 ) {
      getPokemonDetails( modalPokemon.id )
      .then(  resp  => pokemonDetails.value = resp );
    }

  });

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
          <div 
          key={ name } 
          onClick$={() => showModal(id, name)}
          class="m-5 flex flex-col justify-center text-center">
            <PokemonImage id={ id } isVisible={ true } />
            <span class="capitalize">{ name }</span>
          </div>
        ))}
      </div>
      <br /><br /><br />


      <Modal showModal={ modalVisible.value } closeFn={ closeModal } size='lg'>
        <div q:slot='title'> { modalPokemon.name } </div>
        <div q:slot='content' class="flex flex-col justify-center items-center">

          <PokemonImage id={ modalPokemon.id } isVisible={true}/>
          <p class="text-lg">

          {
            pokemonDetails.value == ''
            ? 'Cargando la información...'
            : pokemonDetails
          }

          </p>

        </div>
      </Modal>

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
