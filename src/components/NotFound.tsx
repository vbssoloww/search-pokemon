"use client";

const NotFound = () => {
    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white border border-gray-600 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Pokemon Not Found</h2>
            <p>Sorry, we couldn&apos;t find the Pokémon you were looking for. Please try searching for another name.</p>
        </div>
    );
};

export default NotFound;
