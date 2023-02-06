import axios from "axios";
import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import { useGetDerivativesDetailsQuery } from "../../features/coins/coinsApiSlice";
import Footer from "../../components/Footer/Footer";

const Derivatives = () => {
  // const [derivativesData, setDerivativesData] = useState([]);
  const [perPage, setPerPage] = useState(100);
  const [page, setPage] = useState(1);

  const { data } = useGetDerivativesDetailsQuery({
    perPage: perPage,
    page: page,
  });

  if (!data) return <Loading />;

  return (
    <>
      <NavBar />
      <div className="container-fluid mt-5">
        <table className="table-dark mt-5 w-100">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Exchange</th>
              <th scope="col">24h Open Interest</th>
              <th scope="col">24h Volume</th>
              <th scope="col">Perpetuals</th>
              <th scope="col">Futures</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((derivative, index) => (
                <tr key={derivative.id}>
                  <td>
                    <p>{index + 1}</p>
                  </td>
                  <td>
                    <span>
                      <img src={derivative.image} alt="" />
                    </span>
                    <span>{derivative.name}</span>
                  </td>
                  <td>
                    <span>
                      {derivative.trade_volume_24h_btc
                        ? derivative.trade_volume_24h_btc
                        : "?"}
                    </span>
                  </td>
                  <td>
                    <span>
                      {derivative.open_interest_btc
                        ? derivative.open_interest_btc
                        : "?"}
                    </span>
                  </td>
                  <td>
                    <span>
                      {derivative.number_of_perpetual_pairs
                        ? derivative.number_of_perpetual_pairs
                        : "?"}
                    </span>
                  </td>
                  <td>
                    <span>
                      {derivative.number_of_futures_pairs
                        ? derivative.number_of_futures_pairs
                        : "?"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Derivatives;
