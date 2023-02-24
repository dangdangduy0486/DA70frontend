import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import moment from "moment/moment";
import getCurrencySymbol from "currency-symbols";

import CoinSymbols from "../../components/All Coins/CoinSymbols";
import useAuth from "../../hooks/useAuth";
import {
  useGetP2PSellRequestQuery,
  usePost2P2ClientRequestMutation,
} from "../../features/user/userApiSlice";
import "./P2PTrading.css";

const P2PSell = () => {
  const [wantedAmount, setWantedAmount] = useState();

  const { email } = useAuth();

  const [post2P2ClientRequest] = usePost2P2ClientRequestMutation();

  const handleClientRequest = async (value) => {
    if (wantedAmount > value.amount) {
      toast.warning(`Your amount must be lower than ${value.amount}!!`);
      setWantedAmount(0);
      return;
    } else if (wantedAmount === 0 || !wantedAmount) {
      toast.warning(`Please enter your desired amount`);
      setWantedAmount(0);
      return;
    }
    try {
      await post2P2ClientRequest({
        requestType: "p2pReq",
        type: "sell",
        firstUnit: value.firstUnit,
        secondUnit: value.secondUnit,
        amount: wantedAmount,
        total: (value.total / value.amount) * wantedAmount,
        recieverAddress: value.senderAddress,
        senderAddress: email,
        requestOf: value._id,
      }).unwrap();
      setWantedAmount(0);
      toast.success("Your request has been sent");
    } catch (error) {
      if (error.status === 500) {
        setWantedAmount(0);
        return null;
      } else {
        setWantedAmount(0);
        toast.error(error.data.message);
      }
    }
  };
  const { data } = useGetP2PSellRequestQuery(email);

  if (!data) return null;
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
