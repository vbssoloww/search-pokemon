'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_NAMES } from '../lib/queries';

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const router = useRouter();

    const { loading, error, data } = useQuery(GET_POKEMON_NAMES, {
        variables: { first: 151 },
    });

    useEffect(() => {
        if (data && data.pokemons) {
            const names = data.pokemons.map((pokemon: { name: string }) => pokemon.name);
            setPokemonNames(names);
        }
    }, [data]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = pokemonNames.filter(pokemon =>
                pokemon.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setSelectedSuggestionIndex(-1);
        } else {
            setSuggestions([]);
            setSelectedSuggestionIndex(-1);
        }
    };

    const handleSelect = (pokemon: string) => {
        setSearchTerm(pokemon);
        setSuggestions([]);
        setSelectedSuggestionIndex(-1);
        router.push(`/?name=${pokemon}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
                handleSelect(suggestions[selectedSuggestionIndex]);
            } else if (suggestions.length > 0) {
                handleSelect(suggestions[0]);
            } else if (searchTerm.trim()) {
                router.push(`/?name=${searchTerm}`);
            }
        } else if (event.key === 'ArrowDown') {
            setSelectedSuggestionIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            setSelectedSuggestionIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
            );
        }
    };

    if (loading) return <p className="text-center mt-4 text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-4">Error: {error.message}</p>;

    return (
        <div className="relative mb-8 max-w-lg mx-auto">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                placeholder="Search Pokémon..."
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded-lg mt-1 max-h-40 overflow-auto">
                    {suggestions.map((pokemon, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(pokemon)}
                            className={`p-3 cursor-pointer ${index === selectedSuggestionIndex ? 'bg-gray-600' : 'hover:bg-gray-600'} text-white`}
                        >
                            {pokemon}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
