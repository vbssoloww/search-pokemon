import SearchInput from '../components/SearchInput';
import Result from '../components/Result';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Search Pokémon</h1>
        <SearchInput />
        <Result />
      </div>
    </div>
  );
};

export default Home;
