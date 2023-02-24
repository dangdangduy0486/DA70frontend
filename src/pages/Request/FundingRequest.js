import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import getCurrencySymbol from "currency-symbols";
import moment from "moment/moment";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  useGetUserFundingRequestQuery,
  usePatchAdminResponseMutation,
} from "../../features/user/userApiSlice";
import "./Request.css";
import Loading from "../Loading/Loading";

const FundingRequest = () => {
  const { role } = useAuth();

  const [patchAdminResponse] = usePatchAdminResponseMutation();

  const handleResponseApproved = async (value) => {
    try {
      await patchAdminResponse({
        type: "funding",
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
        type: "funding",
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

  const { data: fundingRequest } = useGetUserFundingRequestQuery();
  if (!fundingRequest) return <Loading />;

  return (
    <>
      <div className="user-request-table-container">
        <table className="table table-dark table-hover user-request-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">From</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              {role === "admin" ? <th scope="col">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {fundingRequest.length <= 0 ? (
              <tr>
                <td>Empty</td>
              </tr>
            ) : (
              fundingRequest &&
              fundingRequest.request.map((rs, index) => (
                <tr key={rs._id}>
                  <th>{index + 1}</th>
                  <td>{rs.recieverAddress ? rs.recieverAddress : "?"}</td>
                  <td>{rs.senderAddress}</td>
                  <td>
                    <span className="text-muted">{`${
                      getCurrencySymbol(rs.firstUnit)
                        ? getCurrencySymbol(rs.firstUnit)
                        : rs.firstUnit
                    } `}</span>
                    <span>{rs.amount ? rs.amount.toLocaleString() : "?"}</span>
                  </td>
                  <td>
                    <span
                      className={`${
                        rs.status === "approved"
                          ? "text-success"
                          : rs.status === "pending"
                          ? "text-warning"
                          : "text-danger"
                      } rounded-pill`}
                      style={{ fontSize: "12px" }}
                    >
                      <FontAwesomeIcon icon={faCircle} className="me-2" />
                      {rs.status.charAt(0).toUpperCase() + rs.status.slice(1)}
                    </span>
                  </td>

                  <td>{moment(rs.date).fromNow()}</td>

                  <td className="request-action">
                    {rs.status === "approved" || rs.status === "rejected" ? (
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
                          onClick={() => handleResponseApproved(rs)}
                          key={rs._id}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className="text-danger"
                          id="denided-check"
                          onClick={() => handleResponseDenided(rs)}
                          key={rs._id}
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

export default FundingRequest;
