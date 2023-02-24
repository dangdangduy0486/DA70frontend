import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { toast } from "react-toastify";
import getCurrencySymbol from "currency-symbols";
import {
  useGetUserOwnRequestQuery,
  usePatch2P2ResponseMutation,
} from "../../features/user/userApiSlice";
import CoinSymbols from "../../components/All Coins/CoinSymbols.js";
import "./P2PTrading.css";
import Loading from "../Loading/Loading";

const P2PRequest = () => {
  const [patch2P2Response] = usePatch2P2ResponseMutation();
  const handleResponseApproved = async (value) => {
    try {
      await patch2P2Response({
        requestID: value._id,
        status: "approved",
      }).unwrap();
      window.location.reload(false);
      toast.success("Approved");
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };

  const handleResponseDenided = async (value) => {
    try {
      await patch2P2Response({
        requestID: value._id,
        status: "rejected",
      }).unwrap();
      window.location.reload(false);
      toast.success("Rejected");
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };

  const { data: p2pData } = useGetUserOwnRequestQuery();

  if (!p2pData) return <Loading />;
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
            {p2pData.request.length <= 0 ? (
              <>
                <tr>
                  <td colSpan="8">
                    <span className="text-muted">Empty</span>
                  </td>
                </tr>
              </>
            ) : (
              p2pData.request &&
              p2pData.request.map((value, index) => (
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
