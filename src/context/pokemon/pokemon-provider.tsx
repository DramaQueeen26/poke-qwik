import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        showBackImage: false,
        isVisible: false,
    });
    
    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: true,
        pokemons: []
    });

    useContextProvider(PokemonGameContext, pokemonGame);
    useContextProvider(PokemonListContext, pokemonList);

    useVisibleTask$( () => {
        if ( localStorage.getItem('pokemon-game') ){
            const {
                pokemonId = 1,
                showBackImage = false,
                isVisible = false
            } = JSON.parse( localStorage.getItem('pokemon-game')! ) as PokemonGameState;

            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;
            pokemonGame.isVisible = isVisible;
        }
    });
    useVisibleTask$( ({ track }) => {
        track( () => [ pokemonGame.pokemonId, pokemonGame.showBackImage, pokemonGame.isVisible ] );

        localStorage.setItem('pokemon-game', JSON.stringify( pokemonGame ));
    });

    return <Slot />;
});