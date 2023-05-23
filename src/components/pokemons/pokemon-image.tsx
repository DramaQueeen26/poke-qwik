import { component$ } from "@builder.io/qwik";

interface Props {
    id: number,
    w?: number,
    h?: number,
    backImage?: boolean,
}

export const PokemonImage = component$( ( {id, w = 200, h = 200, backImage = false}: Props ) => {


    return (
        <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ backImage ? 'back/' : '' }${ id }.png`}
        alt="Pokemon Sprite" 
        width={w}
        height={h}
        />
    );    

});