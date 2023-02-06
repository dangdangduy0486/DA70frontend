import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

import MarketsDetails from "../../components/MarketDetails/MarketsDetails";
import "./Markets.css";
import { FloatButton } from "antd";
import Loading from "../Loading/Loading";
import { useGetMarketsQuery } from "../../features/coins/coinsApiSlice";

const Markets = (props) => {
  const [markets, setMarkets] = useState([]);
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [order, setOrder] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12969);
  const [perPage, setPerPage] = useState(100);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categoryCallback = async (childData) => {
    console.log(childData);
    setIsLoading(true);
    await setCategory(childData);
    setIsLoading(true);
  };
  const cr = async () => {
    if (!props.vsCurrency) {
      setIsLoading(false);
    } else {
      await setVsCurrency(props.vsCurrency);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    cr();
  }, [props, vsCurrency]);

  const { data } = useGetMarketsQuery({
    vs_currency: vsCurrency,
    category: category,
    order: order,
    perPage: perPage,
    page: page,
  });

  useEffect(() => {
    console.log(perPage);
    const check = localStorage.getItem("markets");
    if (isLoading) {
      localStorage.removeItem("markets");
    }
    if (!check && data) {
      localStorage.setItem("markets", JSON.stringify(data));
      setIsLoading(false);
    }
    if (check) {
      setMarkets(JSON.parse(check));
      setIsLoading(false);
    }
  }, [data, isLoading, perPage, page, vsCurrency]);

  //pagination
  const TotalNumber = Math.ceil(totalPages / perPage);

  const first = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(1);
      setIsLoading(true);
      localStorage.removeItem("markets");
    }
  };

  const last = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(TotalNumber);
      setIsLoading(true);
      localStorage.removeItem("markets");
    }
  };

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
      setIsLoading(true);
      localStorage.removeItem("markets");
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
      setIsLoading(true);
      localStorage.removeItem("markets");
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
      setIsLoading(true);
      localStorage.removeItem("markets");
    } else {
      setPage(page + 3);
      setIsLoading(true);
      localStorage.removeItem("markets");
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
      setIsLoading(true);
      localStorage.removeItem("markets");
    } else {
      setPage(page - 2);
      setIsLoading(true);
      localStorage.removeItem("markets");
    }
  };
  //handle loading and error
  if (!markets && !data) return <Loading />;

  return (
    <>
      <div className="markets container-fluid">
        <div className="container mt-3" style={{ height: "100hv" }}>
          <MarketsDetails
            markets={data ? data : markets}
            symbol={vsCurrency}
            categoryFr={categoryCallback}
          />
        </div>

        <hr />
        <div className="flex items-center" id="pagination">
          <ul className="flex items-center justify-end text-sm">
            <li className="flex items-center">
              <button
                disabled={page === 1 ? "disabled" : ""}
                className="outline-0 hover:text-cyan w-8 "
                onClick={first}
                type="button"
              >
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </button>
            </li>
            <li className="flex items-center">
              <button
                disabled={page === 1 ? "disabled" : ""}
                className="outline-0 hover:text-cyan w-8"
                onClick={prev}
                type="button"
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </li>

            {page + 1 === TotalNumber || page === TotalNumber ? (
              <li>
                <button
                  onClick={multiStepPrev}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg"
                >
                  ...
                </button>
              </li>
            ) : null}

            {page - 1 !== 0 ? (
              <li>
                <button
                  onClick={prev}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {page - 1}
                </button>
              </li>
            ) : null}
            <li>
              <button
                disabled
                className="ouline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
              >
                {page}
              </button>
            </li>

            {page + 1 !== TotalNumber && page !== TotalNumber ? (
              <li>
                <button
                  onClick={next}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {page + 1}
                </button>
              </li>
            ) : null}

            {page + 1 !== TotalNumber && page !== TotalNumber ? (
              <li>
                <button
                  onClick={multiStepNext}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
                >
                  ...
                </button>
              </li>
            ) : null}

            {page !== TotalNumber ? (
              <li>
                <button
                  onClick={() => setPage(TotalNumber)}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {TotalNumber}
                </button>
              </li>
            ) : null}
            <li>
              <button
                disabled={page === TotalNumber ? "disabled" : ""}
                className="outline-0 hover:text-cyan w-8"
                onClick={next}
                type="button"
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </li>
            <li>
              <button
                disabled={page === TotalNumber ? "disabled" : ""}
                className="outline-0 hover:text-cyan w-8"
                onClick={last}
                type="button"
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>
            </li>
          </ul>
        </div>
        <FloatButton.BackTop />
      </div>
    </>
  );
};

export default Markets;
