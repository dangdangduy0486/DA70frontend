import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";
import getCurrencySymbol from "currency-symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import "./P2PTrading.css";

const P2PPost = () => {
  const { email } = useAuth();
  // const [p2pRequest, setP2PRequest] = useState([]);
  const [assetChoose, setAssetChoose] = useState("bitcoin");
  const [fiatChoose, setFiatChoose] = useState("usd");
  const [rates, setRates] = useState([]);
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
  }, [assetChoose, fiatChoose]);
  // useEffect(() => {
  //   axios
  //     .get("https://api.coingecko.com/api/v3/simple/price", {
  //       params: {
  //         ids: assetChoose,
  //         vs_currencies: fiatChoose,
  //       },
  //     })
  //     .then((response) => {
  //       setRates(response.data[assetChoose]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [assetChoose, fiatChoose]);

  const onSubmit = async (values) => {
    const { methodChoose, assetChoose, fiatChoose, yourprice, youramount } =
      values;

    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .post(
        `api/user/request-p2p/create`,
        {
          type: methodChoose,
          firstUnit: assetChoose,
          secondUnit: fiatChoose,
          total: yourprice * youramount,
          amount: youramount,
          senderAddress: email,
        },
        opts
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
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
            <label htmlFor="assetChoose">Asset</label>
            <select
              id="assetChoose"
              name="assetChoose"
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
          </div>
          <div className="form_buy_swap">
            <label htmlFor="fiatChoose">with Fiat</label>
            <select
              id="fiatChoose"
              name="fiatChoose"
              value={formik.values.fiatChoose}
              // value={fiatChoose}
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
          </div>
        </div>

        <div className="container_swap">
          <div className="form_buy_text">
            <h6>Lowest Price</h6>
            <p className="text-center">{lowRate[fiatChoose]}</p>
          </div>
          <div className="form_buy_text">
            <h6>Highest Price</h6>
            <p className="text-center">{highRate[fiatChoose]}</p>
          </div>
        </div>

        <div className="container_swap">
          <div className="input_price me-5">
            <label htmlFor="yourprice">Enter your price</label>
            <input
              type="number"
              id="yourprice"
              name="yourprice"
              placeholder="Enter your price"
              value={formik.values.yourprice}
              onChange={formik.handleChange}
              required
            ></input>
            {formik.errors.yourprice && (
              <span className="error">{formik.errors.yourprice}*</span>
            )}
          </div>
          <div className="input_price">
            <label htmlFor="yourprice">Enter your amount</label>
            <input
              type="number"
              id="youramount"
              name="youramount"
              placeholder="Enter your amount"
              value={formik.values.youramount}
              onChange={formik.handleChange}
              required
            ></input>
          </div>
        </div>
        <div className="form_buy_swap">
          <label htmlFor="methodChoose">You want to</label>
          <select
            id="methodChoose"
            name="methodChoose"
            value={formik.values.methodChoose}
            onChange={(e) => {
              const selectOption = e.target.value;
              setMethodChoose(selectOption);
              formik.setFieldValue("methodChoose", e.target.value);
            }}
          >
            {methodOptions.map((methodOption) => (
              <option value={methodOption}>{methodOption.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="">
          <p>Your total</p>
          <p>
            <span className="text-muted pe-2">
              {getCurrencySymbol(fiatChoose)
                ? getCurrencySymbol(fiatChoose)
                : fiatChoose.toLocaleUpperCase()}
            </span>
            {formik.values.yourprice * formik.values.youramount}
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
