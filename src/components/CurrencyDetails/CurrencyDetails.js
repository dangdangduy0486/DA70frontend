import { useState } from "react";
import "./CurrencyDetails.css";
import { useGetCurrenciesQuery } from "../../features/coins/coinsApiSlice";

const CurrencyDetails = (props) => {
  const [selected, setSelected] = useState("usd");

  const handleSelectCurrency = async (value) => {
    await setSelected(value.symbol);
    await props.currencyFr(value.symbol);
  };
  const { data } = useGetCurrenciesQuery();
  if (!data) return null;

  // Create an empty object, used to store the different categories.
  var temporaryObject = {};

  // Scan for each of the objects in the `items` array.
  data.forEach((item) => {
    // Create a category in the teporary object if the category
    // hasn't been created.
    if (typeof temporaryObject[item.category] === "undefined")
      temporaryObject[item.category] = [];

    // Push the item to the its category of the `temporaryObject`.
    temporaryObject[item.category].push({
      id: item._id,
      symbol: item.symbol,
      name: item.name,
    });
  });

  // Create a empty array used to stores the sorted, grouped items.
  var newItems = [];

  // Scan for each of the category in the `temporaryObject`
  for (var category in temporaryObject) {
    // Push the new category in the `newItems` array.
    newItems.push({
      category: category,
      items: [],
    });

    // Get the last category index of the `newItems` array,
    // so we can push the related data to the related category.
    var lastItem = newItems.length - 1;

    // Scan for the related category in the `temporaryObject` object.
    temporaryObject[category].forEach((item) => {
      newItems[lastItem].items.push(item);
    });
  }
  return (
    <>
      <div className="dropstart">
        <button
          className="border border-white rounded-pill"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ height: "30px", width: "150px" }}
        >
          {selected.toUpperCase()}
        </button>
        <ul className="dropdown-menu dropdown-menu-currencies">
          {newItems &&
            newItems.map((currency, index) => (
              <>
                <li className="dropdown-menu-category" key={index}>
                  <p className="dropdown-menu-category-title">
                    {currency.category}
                  </p>
                  <ul id="dropdown-currencies">
                    <li className="dropdown-currencies-items">
                      {currency.items.map((cr) => (
                        <p onClick={() => handleSelectCurrency(cr)} key={cr.id}>
                          <span className="text-muted me-3">
                            {cr.symbol.toUpperCase()}
                          </span>
                          {cr.name}
                        </p>
                      ))}
                    </li>
                  </ul>
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CurrencyDetails;
