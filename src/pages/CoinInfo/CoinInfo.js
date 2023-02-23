import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import getCurrencySymbol from "currency-symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "./CoinInfo.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import Button from "react-bootstrap/esm/Button";
import HistoryChart from "../../components/HistoryChart/HistoryChart";
import useAuth from "../../hooks/useAuth";
import {
  useGetCoinInfoQuery,
  useGetCoinInfoDetailsQuery,
} from "../../features/coins/coinsApiSlice";

const CoinInfo = (props) => {
  // const [coinInfo, setCoinInfo] = useState([]);
  const { coinID } = useParams("");
  const [amount, setAmount] = useState(0);
  const [vsCurrency, setVsCurrency] = useState("usd");

  const callback = async (childData) => {
    await setVsCurrency(childData);
  };

  const { email } = useAuth();

  const handleAmountChange = (event) => {
    if (!event.target.value === true) {
      setAmount(0);
    }
    setAmount(parseFloat(event.target.value));
  };

  const { currentData } = useGetCoinInfoQuery({
    vs_currency: vsCurrency,
    ids: coinID,
  });

  const { data } = useGetCoinInfoDetailsQuery({
    ids: coinID,
  });

  const handleCreateSpotRequest = async (total) => {
    const url = `/api/user/request/create/spot`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    if (amount === 0 || total === 0) {
      toast.warning("Please enter your amount!!!");
      return;
    }

    const res = await axios
      .post(
        url,
        {
          type: "buy",
          firstUnit: coinID,
          secondUnit: vsCurrency,
          amount: amount,
          total: total,
          senderAddress: "DB Crypto",
          recieverAddress: email,
        },
        opts
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        if (!email) {
          toast.error("Please Login");
          return;
        }
        toast.error(error.response.data.message);
      });
    return res.data;
  };
  // const handleCreateWithdrawRequest = async (total) => {
  //   const url = `/api/user/request/create/spot`;
  //   const token = localStorage.getItem("token");

  //   const opts = {
  //     headers: {
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   };
  //   const res = await axios
  //     .post(
  //       url,
  //       {
  //         type: "sell",
  //         firstUnit: coinID,
  //         secondUnit: vsCurrency,
  //         amount: amount,
  //         total: total,
  //         senderAddress: "DB Crypto",
  //         recieverAddress: email,
  //       },
  //       opts
  //     )
  //     .then((response) => {
  //       toast.success(response.data.message);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (!email) {
  //         toast.error("Please Login");
  //         return;
  //       }
  //       toast.error(error.response.data.message);
  //     });
  //   return res.data;
  // };

  if (!currentData || !data) return <Loading />;

  return (
    <>
      <NavBar currencyFr={callback} vsCurrency={vsCurrency} />
      <section className="coininfor">
        <Container className="coin_info">
          <div className="row coin_info_main">
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <div>
                    <div id="coin-info-rank">
                      <p>#Rank {currentData[0].market_cap_rank}</p>
                    </div>
                    <div id="coin-info-name">
                      <span>
                        <img src={currentData[0].image} alt=""></img>
                      </span>
                      <span>{currentData[0].name}</span>
                      <span>({vsCurrency.toUpperCase()})</span>
                    </div>
                    <div>
                      <div>
                        <div>
                          <span className="text-muted">{`${
                            getCurrencySymbol(vsCurrency)
                              ? getCurrencySymbol(vsCurrency)
                              : vsCurrency.toUpperCase()
                          } `}</span>
                          <span className="coin-info-price">
                            {currentData[0].current_price
                              ? currentData[0].current_price.toLocaleString()
                              : "?"}
                          </span>
                          <span
                            className={`${
                              currentData[0]
                                .market_cap_change_percentage_24h_in_currency >
                              0
                                ? "text-success"
                                : "text-danger"
                            } `}
                          >
                            {currentData[0]
                              .market_cap_change_percentage_24h_in_currency >
                            0 ? (
                              <FontAwesomeIcon icon={faArrowTrendUp} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowTrendDown} />
                            )}
                            {currentData[0]
                              .market_cap_change_percentage_24h_in_currency
                              ? currentData[0].market_cap_change_percentage_24h_in_currency.toFixed(
                                  2
                                )
                              : "?"}
                            %
                          </span>
                        </div>
                        <div>
                          <div className="progress">
                            <div
                              style={{
                                width: `${
                                  ((currentData[0].current_price -
                                    currentData[0].low_24h) /
                                    (currentData[0].high_24h -
                                      currentData[0].low_24h)) *
                                  100
                                }%`,
                              }}
                              role="progressbar"
                              className="coin-info-progress"
                              aria-valuenow={
                                currentData[0].current_price
                                  ? currentData[0].current_price
                                  : "?"
                              }
                              aria-valuemin={
                                currentData[0].low_24h
                                  ? currentData[0].low_24h
                                  : "?"
                              }
                              aria-valuemax={
                                currentData[0].high_24h
                                  ? currentData[0].high_24h
                                  : "?"
                              }
                            ></div>
                          </div>
                          <div className="progress_info">
                            <p>
                              <span className="text-muted">{`${
                                getCurrencySymbol(vsCurrency)
                                  ? getCurrencySymbol(vsCurrency)
                                  : vsCurrency.toUpperCase()
                              } `}</span>
                              {currentData[0].low_24h}
                            </p>
                            <p>24H</p>
                            <p>
                              <span className="text-muted">{`${
                                getCurrencySymbol(vsCurrency)
                                  ? getCurrencySymbol(vsCurrency)
                                  : vsCurrency.toUpperCase()
                              } `}</span>
                              {currentData[0].high_24h}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <div className="list-coin-info-2-col">
                <ul className="col">
                  <li>
                    <span className="text-muted">Market Cap</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {currentData[0].market_cap}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">24 Hour Trading Vol</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {currentData[0].total_volume
                        ? currentData[0].total_volume.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Fully Diluted Valuation</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {currentData[0].fully_diluted_valuation
                        ? currentData[0].fully_diluted_valuation.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Circulating Supply</span>
                    <span>
                      {currentData[0].circulating_supply
                        ? currentData[0].circulating_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Total Supply</span>
                    <span>
                      {currentData[0].total_supply
                        ? currentData[0].total_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Max Supply</span>
                    <span>
                      {currentData[0].max_supply
                        ? currentData[0].max_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <h6>Info</h6>
              <div className="row">
                <div className="col">Website</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.links.homepage[0]}
                    >
                      bitcoin.org
                    </a>

                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.links.homepage[0]}
                    >
                      Whitepaper
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">Explorers</div>
                <div className="col">
                  <a
                    className="info_link"
                    type="button"
                    // href={coinInfo.links.blockchain_site}
                  >
                    Blockchair
                  </a>
                </div>
                {/* coinInfo.links.blockchair_site[0] */}
              </div>
              <div className="row">
                <div className="col">Wallet</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://www.ledger.com/"
                    >
                      Ledger
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://trezor.io/"
                    >
                      Trezor
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://electrum.org/#home"
                    >
                      Electrum
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://www.xdefi.io/"
                    >
                      Xdefi
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://www.safepal.com/"
                    >
                      SafePal
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">Community</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.links.subreddit_url}
                    >
                      Reddit
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={`https://twitter.com/${coinInfo.links.twitter_screen_name}`}
                    >
                      Reddit
                    </a>
                    Twitter
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={`https://www.facebook.com/${coinInfo.links.facebook_username}`}
                    >
                      Facebook
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.links.official_forum_url}
                    >
                      bitcointalk.org
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">Search on</div>
                <div className="col">
                  <div>Twitter</div>
                  {/* https://twitter.com/search?q=$btc */}
                </div>
              </div>
              <div className="row">
                <div className="col">Source Code</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.repos_url.github[0]}
                    >
                      Github
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">API id</div>
                <div className="col">
                  <div>bitcoin</div>
                  {/* bitcoin */}
                </div>
              </div>
              <div className="row">
                <div className="col">Tag</div>
                <div className="col">
                  <div>Cryptocurrency</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className=" history-chart overview row">
          <div className="overview-chart col-8">
            <HistoryChart coinID={coinID} />
          </div>
          <div className="col">
            <div
              className="overview-convert mt-4 mb-4"
              style={{ backgroundColor: "white" }}
            >
              <div className="coin_trade text-warning">
                <h3>BUY NOW</h3>
                <div>
                  <span className="text-muted">Enter your amount: </span>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      onChange={handleAmountChange}
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-muted fs-3">Your total: </span>
                  <span className="fs-3">
                    {`${
                      getCurrencySymbol(vsCurrency)
                        ? getCurrencySymbol(vsCurrency)
                        : vsCurrency.toUpperCase()
                    } `}
                  </span>
                  <span className="fs-3" id="spotTotal" name="spotTotal">
                    {currentData[0].current_price * amount
                      ? currentData[0].current_price * amount
                      : 0}
                  </span>
                </div>
                <Button
                  className="create-spot-btn"
                  variant="outline-warning"
                  onClick={() =>
                    handleCreateSpotRequest(
                      currentData[0].current_price * amount
                        ? currentData[0].current_price * amount
                        : 0
                    )
                  }
                >
                  Buy
                </Button>
              </div>
            </div>
            <div className="overview-statistics">
              <h3>
                {vsCurrency.toUpperCase() ? vsCurrency.toUpperCase() : "?"}
                Price Statistics
              </h3>
              <div className="overview-statistics-list">
                <ul>
                  <li>
                    <span className="text-muted">
                      {currentData[0].name ? currentData[0].name : "?"}
                    </span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {currentData[0].current_price
                        ? currentData[0].current_price.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">24h Low / 24h High</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {currentData[0].low_24h ? currentData[0].low_24h : "?"} /
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {currentData[0].high_24h ? currentData[0].high_24h : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Market Cap Rank</span>
                    <span>
                      {currentData[0].market_cap_rank
                        ? currentData[0].market_cap_rank
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Market Cap</span>
                    <span>
                      {currentData[0].market_cap
                        ? currentData[0].market_cap.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Volume / Market Cap</span>
                    <span>
                      {currentData[0].total_volume / currentData[0].market_cap
                        ? (
                            currentData[0].total_volume /
                            currentData[0].market_cap
                          ).toFixed(4)
                        : "?"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Container fluid className="coindetail">
          <div className="">
            <h3 className="text-center">
              What is <span>{data.name}</span> ?
            </h3>
            <p
              className="text-gray-500 [&>a]:text-blue-600 [&>a]:underline"
              dangerouslySetInnerHTML={{
                __html: `${data ? data.description.en : "?"}`,
              }}
            ></p>
          </div>
        </Container>
        <Container>
          <div>
            <h5 className="text-uppercase fs-2">
              <span className="text-warning ">{data.name} </span>
              <span className="text-light">Markets</span>
            </h5>
          </div>
          <div>
            <table
              className="table table-hover"
              style={{ width: "100%", backgroundColor: "white" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Exchange</th>
                  <th scope="col">Pair</th>
                  <th scope="col">Price</th>
                  <th scope="col">Spread</th>
                  <th scope="col">Volume %</th>
                  <th scope="col">Last Traded</th>
                  <th scope="col">Trust Score</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.tickers.map((tik, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{tik.market.name}</td>
                        <td>
                          {tik.base / tik.target ? tik.base / tik.target : "?"}
                        </td>
                        <td>
                          {tik.volume ? tik.volume.toLocaleString() : "?"}
                        </td>
                        <td>
                          {tik.bid_ask_spread_percentage
                            ? tik.bid_ask_spread_percentage.toFixed(2)
                            : "?"}
                        </td>
                        <td>
                          {tik.last / 1000 ? (tik.last / 1000).toFixed(2) : "?"}{" "}
                          %
                        </td>
                        <td>Recently</td>
                        <td>
                          <span
                            className={`${
                              tik.trust_score === "green"
                                ? "text-success"
                                : tik.trust_score === "red"
                                ? "text-warning"
                                : "text-danger"
                            } rounded-pill`}
                            style={{ fontSize: "12px" }}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                          </span>
                        </td>
                      </tr>
                    ))
                  : "?"}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CoinInfo;
