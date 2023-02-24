import React from "react";
import getCurrencySymbol from "currency-symbols";

import "./Fiat.css";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
import CoinSymbols from "../All Coins/CoinSymbols";

const Fiat = () => {
  const { data, error, isLoading } = useGetUserWalletQuery();


  if (!data || error || isLoading) return <Loading />;

  function isFiat(value) {
    return value.type === "Fiat Currencies";
  }
  let fiatList = data.wallet.filter(isFiat);

  function isCrypto(value) {
    return value.type === "Cryptocurrencies";
  }
  let cryptoList = data.wallet.filter(isCrypto);

  return (
    <>
      <section className="container_fiat">
        <h1>
          Fiat and <span>Crypto Currencies</span>
        </h1>
        <div className="bg-light container_spot p-3">
          <div className="container_myasset">
            <div className="myasset_details p-2">
              <div className="myasset_detail">
                <h2>Fiat</h2>
              </div>
              <div className="container-fluid">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiatList.map((w, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{w.currencyID.toUpperCase()}</td>
                        <td>
                          <span className="text-muted">{`${
                            getCurrencySymbol(w.currencyID)
                              ? getCurrencySymbol(w.currencyID)
                              : w.currencyID.toUpperCase()
                          } `}</span>
                          <span>
                            {w.amount ? w.amount.toLocaleString() : "?"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="myasset_detail">
                <h2>Crypto Currencies</h2>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoList.map((w, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{w.currencyID.toUpperCase()}</td>
                        <td>
                          <CoinSymbols ids={w.currencyID} amount={w.amount} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Fiat;
