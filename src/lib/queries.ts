import { gql } from "@apollo/client";

export const GET_POKEMON_NAMES = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      number
      name
    }
  }
`;
