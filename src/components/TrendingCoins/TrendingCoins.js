import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Loading from "../../pages/Loading/Loading";
import { useGetTrendingCoinsQuery } from "../../features/coins/coinsApiSlice";
import "./TrendingCoins.css";

const TrendingCoins = () => {
  const [trendCoins, setTrendingCoins] = useState(null);
  // const url = "api/trending";
  // const token = localStorage.getItem("token");
  // const opts = {
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .get(url, opts)
  //     .then((res) => {
  //       setTrendingCoins(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const { data, error, isLoading } = useGetTrendingCoinsQuery();

  if (!data || error || isLoading) return <Loading />;
  var arrayTrend = [];
  for (var i = 0; i < 4; i++) {
    arrayTrend.push(data.coins[i]);
  }

  return (
    <>
      <div className="container trend">
        <div className="cover_mid cover-gird">
          {arrayTrend &&
            arrayTrend.map((coin) => (
              <div className="girds">
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
      </div>
    </>
  );
};

export default TrendingCoins;
