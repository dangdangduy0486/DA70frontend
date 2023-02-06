import React from "react";
import { useGetCoinImageQuery } from "../../features/coins/coinsApiSlice";

const CoinSymbols = ({ amount, ids }) => {
  const { data } = useGetCoinImageQuery({
    ids: ids,
  });
  if (!data) return null;
  return (
    <>
      {data.coin.map((c) => (
        <>
          <img src={c.image} alt="" width="30px" className="me-3" />
          <span>{amount ? amount.toLocaleString() : null}</span>
        </>
      ))}
    </>
  );
};

export default CoinSymbols;
