import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import Mainbonus from "../MainBonus/MainBonus";

const Home = () => {
  return (
    <>
      <div className="homePage">
        <NavBar />
        <Mainbonus />
      </div>
    </>
  );
};

export default Home;
