import React from "react";
import moment from "moment/moment";
import getCurrencySymbol from "currency-symbols";

import "./Overview.css";
import {
  useGetApprovedSpotRequestQuery,
  useGetApprovedP2PRequestQuery,
  useGetUserWalletQuery,
} from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
import CoinSymbols from "../All Coins/CoinSymbols";

const Overview = () => {
  const { data: spotRequest } = useGetApprovedSpotRequestQuery();
  const { data: P2P } = useGetApprovedP2PRequestQuery();
  const { data: wallet } = useGetUserWalletQuery();

  if (!spotRequest || !P2P) return <Loading />;
  // function sortDate(a, b) {
  //   return new Date(b.date) - new Date(a.date);
  // }
  // const sortData = spotRequest.request
  return (
    <>
      <section className="container_overview">
        <h1>
          Wallet <span>Overview</span>
        </h1>
        <div className="container-fluid overview-table-container">
          <div className="custom-scrollbar">
            <h4 style={{ textAlign: "center" }}>Spot</h4>
            <table className="table table-hover overview-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Crypto currencies</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Total</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {spotRequest &&
                  spotRequest.request.map((dt, index) => (
                    <tr key={dt._id}>
                      <th>{index + 1}</th>
                      <td>
                        <CoinSymbols ids={dt.firstUnit} />
                        <span>
                          {dt.firstUnit.charAt(0).toUpperCase() +
                            dt.firstUnit.slice(1)}
                        </span>
                      </td>
                      <td>{dt.amount}</td>
                      <td>
                        <span className="text-success">
                          {`${
                            getCurrencySymbol(dt.secondUnit)
                              ? getCurrencySymbol(dt.secondUnit)
                              : dt.secondUnit
                          } `}
                        </span>
                        <span className="text-success">
                          {dt.total ? dt.total.toLocaleString() : "null"}
                        </span>
                      </td>
                      <td>{moment(dt.date).fromNow()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="custom-scrollbar">
            <h4 style={{ textAlign: "center" }}>P2P</h4>
            <table className="table table-hover overview-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Crypto currencies</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Total</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {P2P &&
                  P2P.request.map((dt, index) => (
                    <tr key={dt._id}>
                      <th>{index + 1}</th>
                      <td>
                        <CoinSymbols ids={dt.firstUnit} />
                        <span>
                          {dt.firstUnit.charAt(0).toUpperCase() +
                            dt.firstUnit.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${
                            dt.amount < 0 ? "text-danger" : "text-success"
                          }`}
                        >
                          {dt.amount}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${
                            dt.total < 0 ? "text-danger" : "text-success"
                          }`}
                        >
                          {`${
                            dt.secondUnit
                              ? getCurrencySymbol(dt.secondUnit)
                              : "?"
                          } `}
                          {dt.total ? dt.total.toLocaleString() : "null"}
                        </span>
                      </td>
                      <td>{moment(dt.date).fromNow()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="container-fluid overview-wallet-table-container">
          <div className="custom-scrollbar">
            <table className="table table-hover overview-wallet-table">
              <thead>
                <tr>
                  <th scope="col">Currencies</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {wallet &&
                  wallet.wallet.map((wl, index) => (
                    <tr key={wl._id}>
                      <td>{wl.currencyID.toUpperCase()}</td>
                      <td>
                        {wl.type === "Fiat Currencies" ? (
                          <>
                            <span className="text-info">
                              {`${
                                getCurrencySymbol(wl.currencyID)
                                  ? getCurrencySymbol(wl.currencyID)
                                  : wl.currencyID
                              } `}
                            </span>
                            <span className="text-info">
                              {wl.amount ? wl.amount.toLocaleString() : "null"}
                            </span>
                          </>
                        ) : (
                          <CoinSymbols ids={wl.currencyID} amount={wl.amount} />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
