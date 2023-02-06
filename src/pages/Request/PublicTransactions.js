import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import getCurrencySymbol from "currency-symbols";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { useGetTransactionsQuery } from "../../features/coins/coinsApiSlice";
import CoinSymbols from "../../components/All Coins/CoinSymbols.js";
import "./Request.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";

const PublicTransactions = () => {
  const navigate = useNavigate();
  const [p2pRequest, setP2PRequest] = useState([]);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);
  // const [reqType, setReqType] = useState("spot");
  const { email, role } = useAuth();

  //   const handleResponseApproved = async (value) => {
  //     setReqID(value._id);
  //     setStatus("approved");
  //     const url = `api/admin/response/${email}/p2p`;

  //     await axios
  //       .patch(url, {
  //         requestID: reqID,
  //         status: status,
  //       })
  //       .then((response) => {
  //         window.location.reload(false);
  //         req();
  //         navigate("/request");
  //         toast.success(response.data.message);
  //       })
  //       .catch((error) => {
  //         toast.error(error.data.message);
  //       });
  //   };

  //   const handleResponseDenided = async (value) => {
  //     setReqID(value._id);
  //     setStatus("rejected");
  //     const url = `api/admin/response/${email}/p2p`;

  //     await axios
  //       .patch(url, {
  //         requestID: reqID,
  //         status: status,
  //       })
  //       .then((response) => {
  //         window.location.reload(false);
  //         req();
  //         navigate("/request");
  //         toast.success(response.data.message);
  //       })
  //       .catch((error) => {
  //         toast.error(error.data.message);
  //       });
  //   };

  const { data } = useGetTransactionsQuery();

  const callback = () => {};
  if (!data) return <Loading />;
  console.log(data);

  return (
    <>
      <NavBar currencyFr={callback} />
      <div className="mb-4 user-request-table-container">
        <table
          class="table table-dark table-hover transactions-table user-request-table"
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
                      <CoinSymbols
                        ids={rs.firstUnit}
                        amount={rs.amount}
                      />
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
