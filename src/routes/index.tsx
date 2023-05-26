import { component$ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {

  const goToPokemon = useNavigate();

  const {
    pokemonId,
    showBackImage,
    isVisible,
    toggleFromBack,
    toggleVisible,
    nextPokemon,
    prevPokemon,
   } = usePokemonGame();

  return (
    <>
      <span class="text-2xl">Search</span>
      <span class="text-9xl">{ pokemonId.value }</span>   

      <div onClick$={async () => {
        await goToPokemon(`/pokemon/${pokemonId.value}`);
      }}>
        <PokemonImage 
            id={ pokemonId.value } 
            backImage = { showBackImage.value } 
            isVisible={ isVisible.value } 
          />
      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary">Prev</button>
        <button onClick$={ nextPokemon } class="btn btn-primary">Next</button>
        <button onClick$={ toggleFromBack } class="btn btn-primary">Turn around</button>
        <button onClick$={ toggleVisible } class="btn btn-primary">Show Pokemon</button>
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
