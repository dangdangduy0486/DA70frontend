import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleInput = (e) => {
    setWordEntered(e.target.value);
    req(e.target.value);
  };

  const handleFocus = () => {
    const input = document.getElementById("searchInput");
    input.classList.add("focus");
  };

  const req = async () => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${wordEntered}`)
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!filteredData) return null;

  return (
    <div className="search">
      <input
        list="ServiceCity"
        type="text"
        id="searchInput"
        name="searchInput"
        onChange={handleInput}
        onFocus={handleFocus}
      />
      <datalist id="ServiceCity" name="ServiceCity">
        {/* <option value="" disabled selected>
          Select City/County
        </option> */}
        {filteredData.coins &&
          filteredData.coins.map((value) => (
            <>
              <option>
                <Link
                  style={{
                    textDecoration: "none",
                    display: "flex",
                  }}
                  to={`/coins/${value.id}`}
                >
                  <p
                    style={{ color: "black", marginBottom: 0 }}
                    className="me-3"
                  >
                    {value.name}
                  </p>
                  <span className="text-muted">
                    {value.symbol.toUpperCase()}
                  </span>
                </Link>
              </option>
            </>
          ))}
      </datalist>
    </div>
  );
}

export default SearchBar;
