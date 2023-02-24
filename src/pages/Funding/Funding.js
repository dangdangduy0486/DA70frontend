import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import "./Funding.css";
import useAuth from "../../hooks/useAuth";
import { useGetCurrenciesQuery } from "../../features/coins/coinsApiSlice";
import { usePostClientRequestMutation } from "../../features/user/userApiSlice";
import { toast } from "react-toastify";

const Funding = () => {
  const [currencyID, setCurrencyID] = useState("");
  const [creditcard, setCreditcard] = useState("");
  const [amount, setAmount] = useState(null);

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

  const { data, error, isLoading } = useGetCurrenciesQuery();

  function isFiat(value) {
    return (
      value.category === "Fiat Currencies" ||
      value.category === "Suggested Currencies"
    );
  }

  const handleOnChange = (event) => {
    setAmount(event.target.value);
  };
  const [postClientRequest] = usePostClientRequestMutation();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postClientRequest({
        reqType: "funding",
        firstUnit: currencyID,
        senderAddress: creditcard,
        amount: amount,
        recieverAddress: email,
      }).unwrap();
      toast.success("Your request has been sent");
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };
  if (!data || error || isLoading) return <Loading />;
  var filtered = data.filter(isFiat);

  return (
    <>
      <NavBar />
      <section className="container_charge">
        <div className="container_chargeform">
          <h4 className="text-center pe-1 fw-bold">FUNDING</h4>
          <form className="form_charge" onSubmit={() => HandleSubmit()}>
            <div className="form-floating mb-4">
              <select
                className="form-select"
                id="floatingFiat"
                aria-label="Floating label select example"
                name="currency"
                onChange={(e) => {
                  const selectCurrency = e.target.value;
                  setCurrencyID(selectCurrency);
                }}
              >
                <option selected>Open this select menu</option>
                {filtered.map((unit) => (
                  <option value={unit.symbol}>{unit.name}</option>
                ))}
              </select>
              <label for="floatingFiat">Fiat</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                id="floatingAmount"
                placeholder="Your amount"
                onChange={handleOnChange}
              />
              <label htmlFor="floatingAmount">Amount</label>
            </div>
            <div className="form-floating mb-4">
              <select
                className="form-select"
                id="floatingCreditCard"
                onChange={(e) => {
                  const selectCreditCard = e.target.value;
                  setCreditcard(selectCreditCard);
                }}
              >
                <option selected>Open this select menu</option>
                {ListCreditCard.map((unit) => (
                  <option value={unit.value}>{unit.value}</option>
                ))}
              </select>
              <label for="floatingCreditCard">Credit cart</label>
            </div>
            <div className="chargeform_group mb-4">
              <button
                type="submit"
                onClick={HandleSubmit}
                className="btn_recharge btn btn-outline-warning"
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
