import React from "react";

const CurrencyInput = (props) => {
  return (
    <div className="group">
      <input
        type="text"
        value={props.amount}
        onChange={(e) => props.onAmountChange(e.target.value)}
      />
      <select
        value={props.currency}
        onChange={(e) => props.onCurrencyChange(e.target.value)}
      >
        {props.currencies.map((currency) => (
          <option value={currency}>{currency.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
