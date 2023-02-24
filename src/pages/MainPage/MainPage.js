import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CarouselCoins from "../../components/CarouselCoins/CarouselCoins ";
import Portfolio from "../Portfolio/Portfolio";
import Markets from "../Markets/Markets";
import Categories from "../../components/Cryptocurrencies/Categories";
import { useState } from "react";

const MainPage = () => {
  const [vsCurrency, setVsCurrency] = useState();
  const callback = async (childData) => {
    await setVsCurrency(childData);
    if (childData === vsCurrency) {
      setVsCurrency();
      setVsCurrency(childData);
    }
  };

  return (
    <>
      <NavBar currencyFr={callback} />
      <CarouselCoins />
      <div className="container">
        <section className="tradingtopeople bg-light p-2">
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane
              tab={
                <span>
                  <FontAwesomeIcon icon={faStar} className="me-2" />
                  <span>Portfolio</span>
                </span>
              }
              key="1"
            >
              <Portfolio />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Markets" key="2">
              <Markets vsCurrency={vsCurrency} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Categories" key="3">
              <Categories />
            </Tabs.TabPane>
          </Tabs>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
