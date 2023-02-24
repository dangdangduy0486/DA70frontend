import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import getCurrencySymbol from "currency-symbols";
import moment from "moment/moment";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  useGetUserSpotRequestQuery,
  usePatchAdminResponseMutation,
} from "../../features/user/userApiSlice";
import CoinSymbols from "../../components/All Coins/CoinSymbols";
import "./Request.css";
import Loading from "../Loading/Loading";

const SpotRequest = () => {
  const { email, role } = useAuth();

  const [patchAdminResponse] = usePatchAdminResponseMutation();

  const handleResponseApproved = async (value) => {
    try {
      await patchAdminResponse({
        type: "spot",
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
      await patchAdminResponse({
        type: "spot",
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

  const { data: spotRequest } = useGetUserSpotRequestQuery(email);

  if (!spotRequest) return <Loading />;
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
            {spotRequest.request.length <= 0 ? (
              <tr style={{ textAlign: "center" }}>Empty</tr>
            ) : (
              spotRequest.request &&
              spotRequest.request.map((r, index) => (
                <>
                  <tr>
                    <td>
                      <CoinSymbols ids={r.firstUnit} />
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
                          : r.secondUnit
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
