import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$} from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

// ? El routeLoader se ejecuta antes de renderizar el componente
export const usePokemonId = routeLoader$<number>( ({ params, redirect }) => {

  const id = Number(params.id);

  if( isNaN( id ) ) redirect(301, '/');
  if( id <= 0 || id >= 1000 ) redirect(301, '/');

  return id;

}); 

export default component$(() => {

  // * Con useLocation
  // const location = useLocation();
  // const id = location.params.id; 

  // * Con routeLoader
  const id = usePokemonId();

  const pokemonGame = useContext( PokemonGameContext );

  return (
    <>
        <span class="text-5xl">Pokemon: { id.value }</span>
        <PokemonImage id={ pokemonGame.pokemonId } isVisible={ pokemonGame.isVisible } backImage={ pokemonGame.showBackImage } />
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