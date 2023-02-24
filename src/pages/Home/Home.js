import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import Mainbonus from "../MainBonus/MainBonus";

const Home = () => {
  const callback = () => {};

  return (
    <>
      <div className="homePage">
        <NavBar currencyFr={callback} />
        <Mainbonus />
      </div>
    </>
  );
};

export default Home;
