import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$} from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';

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

  return (
    <>
        <span class="text-5xl">Pokemon: { id }</span>
        <PokemonImage id={ id.value } isVisible={ true } />
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