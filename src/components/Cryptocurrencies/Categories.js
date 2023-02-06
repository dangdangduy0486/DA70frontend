import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

import { useGetCategoriesQuery } from "../../features/coins/coinsApiSlice";

const Categories = () => {
  // const [categories, setCategories] = useState([]);

  const { data } = useGetCategoriesQuery();

  if (!data) return null;
  console.log(data);
  return (
    <>
      <div className="container">
        <div>
          <h2>Top Crypto Categories By Market Cap</h2>
          <p className="text-muted">
            The cryptocurrency category ranking is based on market
            capitalization.
            <br /> Note: Some cryptocurrencies may overlap across several
            categories
          </p>
        </div>
        <div>
          <table className="table_categories table table-hover">
            <thead>
              <th id="market_rank">#</th>
              <th>Category</th>
              <th></th>
              <th>Top Gainers</th>
              <th>24h</th>
              <th className="market_cap">Market Capitalization</th>
              <th className="total_volume">24h Volume</th>
            </thead>
            <tbody>
              {data &&
                data.map((cate, index) => (
                  <tr key={index}>
                    <td data-label="#">
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p
                        style={{ color: "black", marginBottom: 0 }}
                        className="me-3"
                      >
                        {cate.name}
                      </p>
                    </td>
                    <td data-label="Categories" colspan="2">
                      {cate.top_3_coins.map((coin) => (
                        <img className="imgCoin" src={coin} alt="" />
                      ))}
                    </td>
                    <td data-label="24h">
                      <p
                        className={`${
                          cate.market_cap_change_24h > 0
                            ? "text-success"
                            : "text-danger"
                        } `}
                      >
                        {cate.market_cap_change_24h < 0 ? (
                          <FontAwesomeIcon icon={faArrowTrendDown} />
                        ) : (
                          <FontAwesomeIcon icon={faArrowTrendUp} />
                        )}
                        {cate.market_cap_change_24h
                          ? cate.market_cap_change_24h.toFixed(2)
                          : "?"}
                        %
                      </p>
                    </td>
                    <td>
                      <span>
                        <span className="text-muted me-1">$</span>
                        <span>{cate.market_cap.toLocaleString()}</span>
                      </span>
                    </td>
                    <td>
                      <span>
                        <span className="text-muted me-1">$</span>
                        {cate.volume_24h.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categories;
