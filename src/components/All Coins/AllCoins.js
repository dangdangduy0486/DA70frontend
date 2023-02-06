import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowLeft,
  faArrowRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import Loading from "../../pages/Loading/Loading";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {
  useGetAllcoinsImageQuery,
  useGetSearchedCoinImageQuery,
} from "../../features/coins/coinsApiSlice";

const AllCoins = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12610);
  const [perPage, setPerPage] = useState(100);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const callback = () => {};

  //total per page
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(parseInt(val));
      inputRef.current.value = val;
    }
  };

  //pagination
  const TotalNumber = Math.ceil(totalPages / perPage);

  const first = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(1);
    }
  };

  const last = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(TotalNumber);
    }
  };

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  const { data } = useGetAllcoinsImageQuery({
    page: page,
  });

  if (!coins || !data) return <Loading />;

  return (
    <>
      <NavBar currencyFr={callback} />
      <table className="table table-dark table-hover w-100 h-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
          </tr>
        </thead>
        {data.coins.length === 0 ? (
          <Loading />
        ) : (
          <tbody>
            {data.coins &&
              data.coins.map((coin, index) => (
                <>
                  <tr key={coin._id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="me-3">
                        <img className="imgCoin" src={coin.image} alt="" />
                      </span>
                      <span>{coin.name}</span>
                    </td>
                    <td>{coin.symbol}</td>
                  </tr>
                </>
              ))}
          </tbody>
        )}
      </table>

      <hr />
      <div className="flex items-center" id="pagination">
        <form
          className="relative flex items-center font-nunito
          mr-12
          "
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="perpage"
            className="relative flex justify-center items-center
          mr-2 font-bold
          "
          >
            per page:
          </label>
          <input
            type="number"
            name="perpage"
            min={1}
            max={250}
            ref={inputRef}
            placeholder={perPage}
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100
     pl-2 required outline-0 border border-transparent 
     focus:border-cyan leading-4
     "
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </button>
        </form>
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button
              disabled={page === 1 ? "disabled" : ""}
              className="outline-0 hover:text-cyan w-8 "
              onClick={first}
              type="button"
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          </li>
          <li className="flex items-center">
            <button
              disabled={page === 1 ? "disabled" : ""}
              className="outline-0 hover:text-cyan w-8"
              onClick={prev}
              type="button"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
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
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </li>
          <li>
            <button
              disabled={page === TotalNumber ? "disabled" : ""}
              className="outline-0 hover:text-cyan w-8"
              onClick={last}
              type="button"
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AllCoins;
