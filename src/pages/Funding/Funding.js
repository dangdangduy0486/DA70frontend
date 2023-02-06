import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import "./Funding.css";
import useAuth from "../../hooks/useAuth";
import { useGetCurrenciesQuery } from "../../features/coins/coinsApiSlice";
import { useFundingMutation } from "../../features/user/userApiSlice";
import { toast } from "react-toastify";

const Funding = () => {
  const [walletChoose, setWalletChoose] = useState("Fiat and spot");
  const [currencyID, setCurrencyID] = useState("");
  const [creditcard, setCreditcard] = useState("");
  const [amount, setAmount] = useState(null);
  const walletOption = ["Fiat and spot", "Futures", "funding"];

  const ListCreditCard = [
    {
      value: "Mastercard",
    },
    {
      value: "Visa",
    },
    {
      value: "Paypal",
    },
    {
      value: "JCB",
    },
    {
      value: "Discover",
    },
    {
      value: "Apple Pay",
    },
    {
      value: "Amazon Pay",
    },
    {
      value: "Diners Club International",
    },
    {
      value: "Stripe",
    },
    {
      value: "American Express",
    },
  ];

  const { email } = useAuth();

  // const [funding] = useFundingMutation();

  const { data, error, isLoading } = useGetCurrenciesQuery();
  if (!data || error || isLoading) return null;

  function isFiat(value) {
    return (
      value.category === "Fiat Currencies" ||
      value.category === "Suggested Currencies"
    );
  }

  var filtered = data.filter(isFiat);

  const handleOnChange = (event) => {
    setAmount(event.target.value);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    console.log(currencyID);
    console.log(creditcard);
    console.log(amount);
    console.log(email);
    // await funding({ email });
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .post(
        `api/user/request/create/funding`,
        // `api/user/request/${email}/funding`,
        {
          firstUnit: currencyID,
          senderAddress: creditcard,
          amount: amount,
          recieverAddress: email,
        },
        opts
      )
      .then((response) => {
        toast.success(response.data.message);
        // console.log("success");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <NavBar />
      <section className="container_charge">
        <div className="container_chargeform">
          <h4 className="text-center pe-1">FUNDING</h4>
          <form className="form_charge" onSubmit={() => HandleSubmit()}>
            <div className="chargeform_group">
              <label htmlFor="amount">Your amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter your amount"
                onChange={handleOnChange}
              ></input>
            </div>
            <div className="chargeform_group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                onChange={(e) => {
                  const selectCurrency = e.target.value;
                  setCurrencyID(selectCurrency);
                }}
              >
                <option selected>---</option>
                {filtered.map((unit) => (
                  <option value={unit.symbol}>{unit.name}</option>
                ))}
              </select>
            </div>
            <div className="chargeform_group">
              <label htmlFor="credit-card">Credit card</label>
              <select
                id="credit-card"
                name="credit-card"
                onChange={(e) => {
                  const selectCreditCard = e.target.value;
                  setCreditcard(selectCreditCard);
                }}
              >
                <option selected>---</option>
                {ListCreditCard.map((unit) => (
                  <option value={unit.value}>{unit.value}</option>
                ))}
              </select>
            </div>
            <div className="chargeform_group">
              <button
                type="submit"
                onClick={HandleSubmit}
                className="btn_recharge"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Funding;
