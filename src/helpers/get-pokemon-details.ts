import type { PokemonDetailsResponse } from "~/interfaces";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species';

export const getPokemonDetails = async( id: string ) => {

  const resp = await fetch(`${baseUrl}/${id}`);
  const data = ( await resp.json() ) as PokemonDetailsResponse;
  const desc = data.flavor_text_entries.filter( ( text ) => text.language.name === 'es' );

  // * Pequeña validación ya que la api trae texto que se repite
  for( let i = 0; i < desc.length; i++ ){

    if( i === desc.length - 1 ) break;

    if( desc[ i ].flavor_text === desc[ i + 1 ].flavor_text ) delete desc[i];

  }

  return desc.map( ( text ) => text.flavor_text ).join(' ') || 'No hay información sobre este Pokemon';

}