import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import moment from "moment/moment";
import getCurrencySymbol from "currency-symbols";

import CoinSymbols from "../../components/All Coins/CoinSymbols";
import useAuth from "../../hooks/useAuth";
import { useGetP2PSellRequestQuery } from "../../features/user/userApiSlice";
import "./P2PTrading.css";

const P2PSell = () => {
  const [p2pData, setP2PData] = useState([]);
  const [wantedAmount, setWantedAmount] = useState();

  const { email } = useAuth();

  const handleClientRequest = async (value) => {
    console.log(value);
    const url = `api/user/request-p2p/create/client-request`;
    const token = localStorage.getItem("token");

    if (wantedAmount > value.amount) {
      toast.warning(`Your amount must be lower than ${value.amount}!!`);
      return;
    } else if (wantedAmount === 0 || !wantedAmount) {
      toast.warning(`Please enter your desired amount`);
      return;
    }

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    await axios
      .post(
        url,
        {
          requestType: "p2pReq",
          type: "sell",
          firstUnit: value.firstUnit,
          secondUnit: value.secondUnit,
          amount: wantedAmount,
          total: (value.total / value.amount) * wantedAmount,
          recieverAddress: value.senderAddress,
          senderAddress: email,
          requestOf: value._id,
        },
        opts
      )
      .then((response) => {
        // window.location.reload(false);
        // req();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  console.log(email);
  const { data } = useGetP2PSellRequestQuery(email);

  if (!p2pData || !data) return null;
  console.log(data);
  return (
    <>
      <div className="P2P-table-container">
        <table className="table table-dark table-hover w-100 P2P-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sender</th>
              <th scope="col">Unit</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.request &&
              data.request.map((value, index) => (
                <tr key={value._id}>
                  <th>{index + 1}</th>
                  <td>
                    <span className="text-muted">{value.senderAddress}</span>
                  </td>
                  <td>
                    <CoinSymbols
                      key={value._id}
                      ids={value.firstUnit}
                      amount={value.amount}
                    />
                  </td>
                  <td>
                    <td>
                      <input
                        onChange={(e) => setWantedAmount(e.target.value)}
                        style={{ width: "50px  " }}
                      />
                    </td>
                  </td>
                  <td>
                    <span className="text-muted">{`${
                      getCurrencySymbol(value.secondUnit)
                        ? getCurrencySymbol(value.secondUnit)
                        : value.secondUnit
                    } `}</span>
                    <span>
                      {value.total ? value.total.toLocaleString() : "?"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${
                        value.status === "approved"
                          ? "text-success"
                          : value.status === "pending"
                          ? "text-warning"
                          : "text-danger"
                      } rounded-pill`}
                      style={{ fontSize: "12px" }}
                    >
                      <FontAwesomeIcon icon={faCircle} className="me-2" />
                      {value.status.charAt(0).toUpperCase() +
                        value.status.slice(1)}
                    </span>
                  </td>
                  <td>{moment(value.date).fromNow()}</td>
                  <td>
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-success me-3"
                      id="approved-check"
                      onClick={() => handleClientRequest(value)}
                      key={value._id}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default P2PSell;
