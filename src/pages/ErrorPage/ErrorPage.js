import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa4,
  fa0,
  faN,
  faO,
  faT,
  faU,
  faD,
  faF,
} from "@fortawesome/free-solid-svg-icons";
import "./ErrorPage.css";
const ErrorPage = () => {
  return (
    <div className="container-error-page">
      <div className="error-number me-3">
        <FontAwesomeIcon icon={fa4} className="error4" />
        <FontAwesomeIcon icon={fa0} className="error0" />
        <FontAwesomeIcon icon={fa4} className="error4" />
      </div>
      <div className="error-not-found">
        <FontAwesomeIcon icon={faN} />
        <FontAwesomeIcon icon={faO} />
        <FontAwesomeIcon icon={faT} />

        <FontAwesomeIcon icon={faF} />
        <FontAwesomeIcon icon={faO} />
        <FontAwesomeIcon icon={faU} />
        <FontAwesomeIcon icon={faN} />
        <FontAwesomeIcon icon={faD} />
      </div>
    </div>
  );
};

export default ErrorPage;
