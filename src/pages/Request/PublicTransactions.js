import React from "react";
import getCurrencySymbol from "currency-symbols";
import moment from "moment/moment";
import { useGetTransactionsQuery } from "../../features/coins/coinsApiSlice";
import CoinSymbols from "../../components/All Coins/CoinSymbols.js";
import "./Request.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";

const PublicTransactions = () => {
  const { data } = useGetTransactionsQuery();
  if (!data) return <Loading />;

  return (
    <>
      <NavBar />
      <div className="mb-4 user-request-table-container">
        <table
          className="table table-dark table-hover transactions-table user-request-table"
          style={{ height: "100vh" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Method</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.transaction.length <= 0 ? (
              <>
                <tr>
                  <td colSpan="8">
                    <span className="text-muted">Empty</span>
                  </td>
                </tr>
              </>
            ) : (
              data.transaction &&
              data.transaction.map((rs, index) => (
                <>
                  <tr key={rs._id}>
                    <th>{index + 1}</th>
                    <td>
                      <span
                        className="user-address"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={rs.senderAddress}
                      >
                        {rs.senderAddress}
                      </span>
                    </td>
                    <td>
                      <span
                        className="user-address"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={rs.recieverAddress ? rs.recieverAddress : "?"}
                      >
                        {rs.recieverAddress ? rs.recieverAddress : "?"}
                      </span>
                    </td>
                    <td>{rs.type.toUpperCase()}</td>
                    <td>
                      <CoinSymbols ids={rs.firstUnit} amount={rs.amount} />
                    </td>
                    <td>
                      <span className="text-muted">{`${
                        getCurrencySymbol(rs.secondUnit)
                          ? getCurrencySymbol(rs.secondUnit)
                          : "?"
                      } `}</span>
                      <span>{rs.total.toLocaleString()}</span>
                    </td>
                    <td>{moment(rs.date).fromNow()}</td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default PublicTransactions;
