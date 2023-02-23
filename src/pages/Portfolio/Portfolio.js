import React from "react";
import CoinSymbols from "../../components/All Coins/CoinSymbols";
import { useGetPortfolioQuery } from "../../features/user/userApiSlice";
import Loading from "../Loading/Loading";
import "./portfolio.css";

const Portfolio = () => {
  const { data, isError } = useGetPortfolioQuery();
  console.log(data);

  if (isError) return <Loading />;
  return (
    <>
      <div className="portfolio-table-container">
        <table className="table table-dark table-hover portfolio-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Coin</th>
            </tr>
          </thead>
          <tbody>
            {!data || data.portfolio.length <= 0 || isError ? (
              <>
                <tr>
                  <td colSpan="2">
                    <span className="text-muted">Empty</span>
                  </td>
                </tr>
              </>
            ) : (
              data.portfolio &&
              data.portfolio.map((pro, index) => (
                <tr key={pro._id}>
                  <th>{index + 1}</th>
                  <td>
                    <CoinSymbols ids={pro.currencyID} />
                    {pro.currencyID.charAt(0).toUpperCase() +
                      pro.currencyID.slice(1)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Portfolio;
