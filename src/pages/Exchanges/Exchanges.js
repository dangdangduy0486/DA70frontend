import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import { FloatButton } from "antd";
import { useGetExchangesDetailsQuery } from "../../features/coins/coinsApiSlice";
import Footer from "../../components/Footer/Footer";
import "./Exchanges.css";
const Exchanges = () => {
  const [perPage, setPerPage] = useState(100);
  const [page, setPage] = useState(1);

  const { data } = useGetExchangesDetailsQuery({
    perPage: perPage,
    page: page,
  });
  if (!data) return <Loading />;
  return (
    <>
      <NavBar />
      <div className="container_exchanges">
        <table className="table-dark table-hover w-100">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Exchange</th>
              <th scope="col">Trust Score</th>
              <th scope="col">24h Volume (Normalized)</th>
              <th scope="col">24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((exchange) => (
                <>
                  <tr key={exchange.id}>
                    <td>{exchange.trust_score_rank}</td>
                    <td>
                      <span style={{ marginRight: 6 }}>
                        <img src={exchange.image} alt="" />
                      </span>
                      <span>{exchange.name}</span>
                    </td>
                    <td>
                      {exchange.trust_score ? (
                        <div className="progress">
                          <div
                            className={`${
                              exchange.trust_score >= 5
                                ? "progress-bar bg-success"
                                : "progress-bar bg-warning"
                            }`}
                            style={{ width: `${exchange.trust_score * 10}%` }}
                            role="progressbar"
                            aria-valuenow={exchange.trust_score}
                            aria-valuemin="0"
                            aria-valuemax="10"
                          >
                            {exchange.trust_score}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p>NaN</p>
                        </div>
                      )}
                    </td>
                    <td>
                      <div>
                        {exchange.trade_volume_24h_btc_normalized
                          ? exchange.trade_volume_24h_btc_normalized.toFixed(2)
                          : "?"}
                        <div>USD</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {exchange.trade_volume_24h_btc
                          ? exchange.trade_volume_24h_btc.toFixed(2)
                          : "?"}
                      </div>
                      <div>USD</div>
                    </td>
                    <td></td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <FloatButton.BackTop />
      </div>
      <Footer />
    </>
  );
};

export default Exchanges;
