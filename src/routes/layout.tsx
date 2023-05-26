import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonGameContext, type PokemonGameState } from '~/context';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  
  useStyles$(styles);
  
  // * Llamar al context
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: false,
    isVisible: false,
  });

  useContextProvider( PokemonGameContext, pokemonGame );

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
