"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search) {
            router.push(`/?name=${search}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Pokémon by name"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchInput;
