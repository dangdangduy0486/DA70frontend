import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import getCurrencySymbol from "currency-symbols";
import moment from "moment/moment";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { useGetUserSpotRequestQuery } from "../../features/user/userApiSlice";
import CoinSymbols from "../../components/All Coins/CoinSymbols";
import "./Request.css";

const SpotRequest = () => {
  const navigate = useNavigate();
  const [spotRequest, setSpotRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);

  const { email, role } = useAuth();

  const handleResponseApproved = async (value) => {
    await setReqID(value._id);
    await setStatus("approved");
    const url = `api/admin/response/update/spot`;
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
        window.location.reload(false);
        req();
        navigate("/request");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleResponseDenided = async (value) => {
    await setReqID(value._id);
    await setStatus("rejected");
    const url = `api/admin/response/update/spot`;
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
        window.location.reload(false);
        req();
        navigate("/request");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const { data } = useGetUserSpotRequestQuery(email);

  const req = () => {
    const token = localStorage.getItem("token");
    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    const url = `api/user/request/review/spot`;
    axios
      .get(url, opts)
      .then((response) => {
        setSpotRequest(response.data.request);
      })
      .catch((error) => {
        if (!error.response.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    try {
      req();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!spotRequest || !data) return null;
  console.log(data);
  return (
    <>
      <div className="user-request-table-container">
        <table
          className="table table-dark table-hover user-request-table"
          id=""
        >
          <thead>
            <tr>
              <th scope="col">Cryptocurrencies</th>
              <th scope="col">Price</th>
              <th scope="col">Address</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              {role === "admin" ? <td>Actions</td> : null}
            </tr>
          </thead>
          <tbody>
            {data.request.length <= 0 ? (
              <tr style={{ textAlign: "center" }}>Empty</tr>
            ) : (
              data.request &&
              data.request.map((r, index) => (
                <>
                  <tr>
                    <td>
                      <CoinSymbols
                        ids={r.firstUnit}
                      />
                      {r.firstUnit.charAt(0).toUpperCase() +
                        r.firstUnit.slice(1)}
                    </td>
                    <td>
                      <span className="text-muted">{`${
                        getCurrencySymbol(r.secondUnit)
                          ? getCurrencySymbol(r.secondUnit)
                          : "?"
                      } `}</span>
                      <span>{(r.total / r.amount).toLocaleString()}</span>
                    </td>
                    <td>{r.senderAddress}</td>
                    <td>{r.amount}</td>
                    <td>
                      <span className="text-muted">{`${
                        getCurrencySymbol(r.secondUnit)
                          ? getCurrencySymbol(r.secondUnit)
                          : "?"
                      } `}</span>
                      <span>
                        {r.total.toLocaleString()
                          ? r.total.toLocaleString()
                          : "?"}
                      </span>
                    </td>
                    <td>
                      <span>{r.type}</span>
                    </td>
                    <td>
                      <span
                        className={`${
                          r.status === "approved"
                            ? "text-success"
                            : r.status === "pending"
                            ? "text-warning"
                            : "text-danger"
                        } rounded-pill`}
                        style={{ fontSize: "12px" }}
                      >
                        <FontAwesomeIcon icon={faCircle} className="me-2" />
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </td>

                    <td>{moment(r.date).fromNow()}</td>

                    {r.status === "approved" || r.status === "rejected" ? (
                      <td></td>
                    ) : (
                      <td className="request-action">
                        <span
                          className="text-success me-3"
                          id="approved-check"
                          onClick={() => handleResponseApproved(r)}
                          key={r._id}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className="text-danger"
                          id="denided-check"
                          onClick={() => handleResponseDenided(r)}
                          key={r._id}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </span>
                      </td>
                    )}
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SpotRequest;
