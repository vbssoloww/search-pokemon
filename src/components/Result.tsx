"use client";

import { useQuery, gql } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
      }
    }
  }
`;

const Result = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    const { loading, error, data } = useQuery(GET_POKEMON, {
        variables: { name },
        skip: !name,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!data || !data.pokemon) return <p>Pokemon not found</p>;

    const { pokemon } = data;

    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Number: {pokemon.number}</p>
            <p>Type: {pokemon.types.join(', ')}</p>
            <p>Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
            <p>Height: {pokemon.height.minimum} - {pokemon.height.maximum}</p>
            <h3>Attacks</h3>
            <ul>
                {pokemon.attacks.fast.map((attack) => (
                    <li key={attack.name}>{attack.name} ({attack.type}): {attack.damage}</li>
                ))}
                {pokemon.attacks.special.map((attack) => (
                    <li key={attack.name}>{attack.name} ({attack.type}): {attack.damage}</li>
                ))}
            </ul>
            <h3>Evolutions</h3>
            <ul>
                {pokemon.evolutions && pokemon.evolutions.map((evolution) => (
                    <li key={evolution.id} onClick={() => router.push(`/?name=${evolution.name}`)}>
                        {evolution.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Result;
