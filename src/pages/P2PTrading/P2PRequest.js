import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { toast } from "react-toastify";
import getCurrencySymbol from "currency-symbols";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useGetUserOwnRequestQuery } from "../../features/user/userApiSlice";
import CoinSymbols from "../../components/All Coins/CoinSymbols.js";
import "./P2PTrading.css";

const P2PRequest = () => {
  const navigate = useNavigate();
  const [p2pData, setP2PData] = useState([]);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);
  const { email } = useAuth();

  const handleResponseApproved = async (value) => {
    await setReqID(value._id);
    await setStatus("approved");
    const url = `api/user/request-p2p/update`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    await axios
      .patch(
        url,
        {
          requestID: reqID,
          status: status,
        },
        opts
      )
      .then((response) => {
        // window.location.reload(false);
        req();
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 500) {
          return null;
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleResponseDenided = async (value) => {
    await setReqID(value._id);
    await setStatus("rejected");
    const url = `api/user/request-p2p/update`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    await axios
      .patch(
        url,
        {
          requestID: reqID,
          status: status,
        },
        opts
      )
      .then((response) => {
        // window.location.reload(false);
        req();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const { data } = useGetUserOwnRequestQuery();

  const req = () => {
    const url = `api/user/request-p2p/review/own`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .get(url, opts)
      .then((response) => {
        setP2PData(response.data.request);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    req();
  }, []);

  if (!p2pData) return null;
  console.log(p2pData);
  return (
    <>
      <div className="P2P-table-container">
        <table className="table table-dark table-hover w-100 P2P-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">By</th>
              <th scope="col">Type</th>
              <th scope="col">Unit</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {p2pData.length <= 0 ? (
              <>
                <tr>
                  <td colSpan="8">
                    <span className="text-muted">Empty</span>
                  </td>
                </tr>
              </>
            ) : (
              p2pData &&
              p2pData.map((value, index) => (
                <tr key={value._id}>
                  <th>{index + 1}</th>
                  <td>
                    <p className="text-muted">
                      {value.senderAddress ? value.senderAddress : "Not yet"}
                    </p>
                  </td>
                  <td>
                    <p
                      className={`${
                        value.type === "sell" ? "text-warning" : "text-info"
                      } `}
                    >
                      {value.type.toUpperCase()}
                    </p>
                  </td>
                  <td>
                    <CoinSymbols
                      key={value._id}
                      ids={value.firstUnit}
                      amount={value.amount}
                    />
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
                    {value.status === "approved" ||
                    value.status === "rejected" ? (
                      <>
                        {/* <span
                        className="text-secondary me-3"
                        id="approved-check"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span className="text-secondary" id="denided-check">
                        <FontAwesomeIcon icon={faX} />
                      </span> */}
                      </>
                    ) : (
                      <>
                        <span
                          className="text-success me-3"
                          id="approved-check"
                          onClick={() => handleResponseApproved(value)}
                          key={value._id}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className="text-danger"
                          id="denided-check"
                          onClick={() => handleResponseDenided(value)}
                          key={value._id}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </span>
                      </>
                    )}
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

export default P2PRequest;
