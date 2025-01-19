"use client";

import { useQuery, gql } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import NotFound from './NotFound';

interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  id: string;
  name: string;
}

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

  useEffect(() => {
    if (!name) {
      // Handle cases where no Pokémon name is provided
    }
  }, [name]);

  if (loading) return <p className="text-center mt-4 text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error: {error.message}</p>;

  if (!data || !data.pokemon) {
    return <NotFound />;
  }

  const { pokemon } = data;

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white border border-gray-600 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">{pokemon.name}</h2>
      <Image src={pokemon.image} alt={pokemon.name} width={128} height={128} className="w-32 h-32 mx-auto mb-4" />
      <div className="text-center">
        <p className="mb-2">Number: <span className="font-semibold">{pokemon.number}</span></p>
        <p className="mb-2">Type: <span className="font-semibold">{pokemon.types.join(', ')}</span></p>
        <p className="mb-2">Weight: <span className="font-semibold">{pokemon.weight.minimum} - {pokemon.weight.maximum}</span></p>
        <p className="mb-2">Height: <span className="font-semibold">{pokemon.height.minimum} - {pokemon.height.maximum}</span></p>
      </div>
      <h3 className="text-lg font-semibold mt-4">Attacks</h3>
      <ul className="list-disc list-inside mb-4">
        {pokemon.attacks.fast.map((attack: Attack) => (
          <li key={attack.name} className="mb-2">{attack.name} ({attack.type}): {attack.damage}</li>
        ))}
        {pokemon.attacks.special.map((attack: Attack) => (
          <li key={attack.name} className="mb-2">{attack.name} ({attack.type}): {attack.damage}</li>
        ))}
      </ul>
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4">Evolutions</h3>
          <ul className="list-disc list-inside">
            {pokemon.evolutions.map((evolution: Evolution) => (
              <li
                key={evolution.id}
                className="cursor-pointer text-blue-400 hover:underline"
                onClick={() => router.push(`/?name=${evolution.name}`)}>
                {evolution.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Result;
