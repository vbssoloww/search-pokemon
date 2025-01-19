import SearchBox from '../components/SearchBox';
import Result from '../components/Result';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Pokémon Search</h1>
      <SearchBox />
      <Result />
    </div>
  );
};

export default HomePage;
