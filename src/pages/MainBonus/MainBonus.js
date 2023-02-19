import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

import "./MainBonus.css";
import { Carousel } from "antd";
import Loading from "../Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useGetTrendingCoinsQuery } from "../../features/coins/coinsApiSlice";
import axios from "axios";

const Mainbonus = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  // useEffect(() => {
  //   const url = "api/trending";
  //   const token = localStorage.getItem("token");
  //   const opts = {
  //     headers: {
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   };
  //   const check = localStorage.getItem("trendingCoins");
  //   if (!check) {
  //     axios
  //       .get(url, opts)
  //       .then((res) => {
  //         console.log("hello");
  //         setTrendingCoins(res.data.coins);
  //         localStorage.setItem("trendingCoins", JSON.stringify(res.data.coins));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   if (check) {
  //     setTrendingCoins(JSON.parse(check));
  //   }
  // }, []);
  // console.log(trendingCoins);
  // console.log(typeof trendingCoins);

  const { data } = useGetTrendingCoinsQuery();
  useEffect(() => {
    const check = localStorage.getItem("trendingCoins");
    if (!check && data) {
      setTrendingCoins(data.coins);
      localStorage.setItem("trendingCoins", JSON.stringify(data.coins));
    }
    if (check) {
      setTrendingCoins(JSON.parse(check));
    }
  }, [data]);

  if (!trendingCoins && !data) return <Loading />;

  return (
    <>
      <div className="cover">
        <div className="cover_top">
          <h1>Future of</h1>
          <h1>The World</h1>
          <p>
            Making money is art and working is art and good business is the best
            art.
          </p>
          <Link className="regis-button" to="/signup">
            Register Now
          </Link>
        </div>
        <div className="cover_mid cover-gird">
          {trendingCoins &&
            trendingCoins.map((coin) => (
              <div className="girds" key={coin.item.coin_id}>
                <div className="gird_top">
                  <img src={coin.item.thumb} alt="coin" />
                  <div className="gird_first-head">
                    <h2>{coin.item.name}</h2>
                  </div>
                  <div
                    className={`${
                      coin.item.market_cap_rank < 50
                        ? "text-success"
                        : "text-danger"
                    }  "gird_first-head"`}
                  >
                    <p>Rank-{Math.round(coin.item.market_cap_rank)}</p>
                  </div>
                </div>
                <div className="gird_mid">
                  <h1>{coin.item.price_btc.toFixed(8)}</h1>
                  <Link className="move" to={`/coins/${coin.item.id}`}>
                    <FontAwesomeIcon icon={faCircleRight} />
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="cover_bottom">
          <div className="cover_carousel">
            <Carousel autoplay>
              <div>
                <div className="carousel carousel_1">
                  <h1>Cryptocurrency</h1>
                  <hr />
                  <p>
                    <span>"</span> The ability to create something which is not
                    duplicable in the digital world has enormous value… <br />
                    Lot’s of people will build businesses on top of that..
                    <span>"</span>
                  </p>
                  <h6>Eric Schmidt</h6>
                </div>
              </div>
              <div>
                <div className="carousel carousel_2">
                  <h1>Cryptocurrency</h1>
                  <hr />
                  <p>
                    <span>"</span> Bitcoin is exciting because it shows how
                    cheap it can be. <br /> Bitcoin is better than currency… for
                    large transactions, currency can get pretty inconvenient.
                    <span>"</span>
                  </p>
                  <h6>Bill Gates</h6>
                </div>
              </div>
              <div>
                <div className="carousel carousel_3 ">
                  <h1>Cryptocurrency</h1>
                  <hr />
                  <p>
                    <span>"</span> As people move into Bitcoin for payments and
                    receipts they stop using <br /> US Dollars, Euros and
                    Chinese Yuan which in the long-term devalues these
                    currencies.
                    <span>"</span>
                  </p>
                  <h6>John McAfee</h6>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className="letstart">
          <div>
            <h1>Increase your income</h1>
            <Link
              className="letstart_button"
              to="/markets"
              // onClick="return false"
            >
              <p>Get Start</p>
            </Link>
          </div>
        </div>
        <Footer className="footer_main" />
      </div>
    </>
  );
};

export default Mainbonus;
