import Characters from "../components/characters/Characters";
import HomeHeader from "../components/HomeHeader";

function Home() {
  return (
    <div className="max-w-[1100px]">
      <HomeHeader />
      <Characters />
    </div>
  );
}

export default Home;
