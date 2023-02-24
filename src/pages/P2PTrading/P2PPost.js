import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";
import getCurrencySymbol from "currency-symbols";

import {
  useGetUserWalletQuery,
  usePost2P2RequestMutation,
} from "../../features/user/userApiSlice";
import "./P2PTrading.css";

const P2PPost = () => {
  const { email } = useAuth();
  const [assetChoose, setAssetChoose] = useState("bitcoin");
  const [fiatChoose, setFiatChoose] = useState("usd");
  const [lowRate, setLowRate] = useState([]);
  const [highRate, setHighRate] = useState([]);
  const [methodChoose, setMethodChoose] = useState("");

  const assets = [
    { id: "tether", name: "Tether", symbol: "USDT" },
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "binance-usd", name: "Binance USD", symbol: "BUSD" },
    { id: "binancecoin", name: "Binance", symbol: "BNB" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "coin98", name: "Coin98", symbol: "C98" },
    { id: "binance-peg-xrp", name: "Binance-Peg XRP", symbol: "XRP" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "smooth-love-potion", name: "Smooth Love Potion", symbol: "SLP" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" },
  ];
  const methodOptions = ["buy", "sell"];

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${assetChoose}`)
      .then((response) => {
        setLowRate(response.data.market_data.low_24h);
        setHighRate(response.data.market_data.high_24h);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [assetChoose]);

  const [post2P2Request] = usePost2P2RequestMutation();

  const onSubmit = async (values) => {
    const { methodChoose, assetChoose, fiatChoose, yourprice, youramount } =
      values;

    try {
      await post2P2Request({
        type: methodChoose,
        firstUnit: assetChoose,
        secondUnit: fiatChoose,
        total: yourprice * youramount,
        amount: youramount,
        senderAddress: email,
      }).unwrap();
      toast.success("Your request has been sent");
    } catch (error) {
      if (error.status === 500) {
        return null;
      }
      toast.error(error.data.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      methodChoose: "buy",
      assetChoose: "",
      fiatChoose: "",
      yourprice: "",
      youramount: "",
    },
    validationSchema: Yup.object({
      yourprice: Yup.number()
        .min(lowRate[fiatChoose], "Your price must higher")
        .max(highRate[fiatChoose], "Your price must lower"),
    }),
    onSubmit,
  });
  const { data } = useGetUserWalletQuery();

  if (!data) return null;
  function isFiat(value) {
    return value.type === "Fiat Currencies";
  }
  let fiatList = data.wallet.filter(isFiat);
  return (
    <>
      <h4 className="ads_title">
        Post your <br></br>
        <span>advertisement</span>
      </h4>
      <form className="form_buy" onSubmit={formik.handleSubmit}>
        <div className="container_swap">
          <div className="form_buy_swap">
            <div className="form-floating">
              <select
                id="floating2p2Crpyto"
                name="floating2p2Crpyto"
                className="form-select"
                value={formik.values.assetChoose}
                onChange={(e) => {
                  const selectCoin = e.target.value;
                  setAssetChoose(selectCoin);
                  formik.setFieldValue("assetChoose", e.target.value);
                }}
              >
                <option selected>---</option>
                {assets.map((crypto) => (
                  <>
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name}
                    </option>
                  </>
                ))}
              </select>
              <label htmlFor="floating2p2Crpyto">Crypto</label>
            </div>
          </div>
          <div className="form_buy_swap">
            <div className="form-floating">
              <select
                id="floating2p2Fiat"
                name="floating2p2Fiat"
                className="form-select"
                value={formik.values.fiatChoose}
                onChange={(e) => {
                  const selectCoin = e.target.value;
                  setFiatChoose(selectCoin.toLocaleLowerCase());
                  formik.setFieldValue("fiatChoose", e.target.value);
                }}
              >
                <option selected>---</option>
                {fiatList.map((fiat) => (
                  <>
                    <option key={fiat._id} value={fiat.currencyID}>
                      {fiat.currencyID}
                    </option>
                  </>
                ))}
              </select>
              <label htmlFor="floating2p2Fiat">Fiat</label>
            </div>
          </div>
        </div>

        <div className="container_swap">
          <div className="form_buy_text">
            <h6>Lowest Price</h6>
            <p className="text-center font-monospace fs-5">
              {lowRate[fiatChoose]}
            </p>
          </div>
          <div className="form_buy_text">
            <h6>Highest Price</h6>
            <p className="text-center font-monospace fs-5">
              {highRate[fiatChoose]}
            </p>
          </div>
        </div>

        <div className="container_swap">
          <div className="form-floating input_price me-5">
            <input
              type="number"
              id="yourprice"
              name="yourprice"
              className="form-control"
              placeholder="Enter your price"
              value={formik.values.yourprice}
              onChange={formik.handleChange}
              required
            />
            <label htmlFor="yourprice">Price</label>

            {formik.errors.yourprice && (
              <span className="error">{formik.errors.yourprice}*</span>
            )}
          </div>
          <div className="form-floating input_price">
            <input
              type="number"
              id="youramount"
              name="youramount"
              className="form-control"
              placeholder="Enter your amount"
              value={formik.values.youramount}
              onChange={formik.handleChange}
              required
            ></input>
            <label htmlFor="youramount">Amount</label>
          </div>
        </div>
        <div className="form_buy_swap">
          <div className="form-floating">
            <select
              id="methodChoose"
              name="methodChoose"
              className="form-select"
              value={formik.values.methodChoose}
              onChange={(e) => {
                const selectOption = e.target.value;
                setMethodChoose(selectOption);
                formik.setFieldValue("methodChoose", e.target.value);
              }}
            >
              {methodOptions.map((methodOption) => (
                <option value={methodOption}>
                  {methodOption.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <p className="fs-3 fw-bold">
            Your total:
            <span className="text-muted pe-2 ps-3">
              {getCurrencySymbol(fiatChoose)
                ? getCurrencySymbol(fiatChoose)
                : fiatChoose.toLocaleUpperCase()}
            </span>
            <span> {formik.values.yourprice * formik.values.youramount}</span>
          </p>
        </div>

        <button type="submit" className="btn_post">
          Post
        </button>
      </form>
    </>
  );
};

export default P2PPost;
