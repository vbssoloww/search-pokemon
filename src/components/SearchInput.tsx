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
        <form onSubmit={handleSearch} className="max-w-lg mx-auto p-4 bg-gray-800 text-white border border-gray-600 rounded-lg mb-4">
            <div className="flex items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Pokémon by name"
                    className="flex-grow p-2 rounded-l-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg border border-blue-500"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchInput;
