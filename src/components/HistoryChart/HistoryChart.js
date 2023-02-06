import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useEffect, useState } from "react";

import Loading from "../../pages/Loading/Loading";
import { useGetCoinsHistoryChartQuery } from "../../features/coins/coinsApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = (coinID) => {
  // const [chartValue, setChartValue] = useState(null);
  const [days, setDays] = useState(7);

  // const url = `https://api.coingecko.com/api/v3/coins/${coinID.coinID}/market_chart?vs_currency=usd&days=${days}`;
  // const token = localStorage.getItem("token");
  // const opts = {
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .get(url, opts)
  //     .then((response) => {
  //       setChartValue(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
  const { data, error, isLoading } = useGetCoinsHistoryChartQuery({
    coinID: coinID.coinID,
    days: days,
  });
  if (!data || error || isLoading) return <Loading />;

  const handleChangeDays = (e) => {
    setDays(e.target.value);
  };

  const coinChartData = data.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };
  const dt = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: coinID.coinID,
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="7days"
          id="7days"
          autoComplete="off"
          onClick={handleChangeDays}
          value={7}
        />
        <label className="btn btn-outline-primary" htmlFor="7days">
          7d
        </label>

        <input
          type="radio"
          className="btn-check"
          name="14days"
          id="14days"
          autoComplete="off"
          onClick={handleChangeDays}
          value={14}
        />
        <label className="btn btn-outline-primary" htmlFor="14days">
          14d
        </label>

        <input
          type="radio"
          className="btn-check"
          name="30days"
          id="30days"
          autoComplete="off"
          onClick={handleChangeDays}
          value={30}
        />
        <label className="btn btn-outline-primary" htmlFor="30days">
          30d
        </label>

        <input
          type="radio"
          className="btn-check"
          name="90days"
          id="90days"
          autoComplete="off"
          onClick={handleChangeDays}
          value={90}
        />
        <label className="btn btn-outline-primary" htmlFor="90days">
          90d
        </label>

        <input
          type="radio"
          className="btn-check"
          name="180days"
          id="180days"
          autoComplete="off"
          onClick={handleChangeDays}
          value={180}
        />
        <label className="btn btn-outline-primary" htmlFor="180days">
          180d
        </label>

        <input
          type="radio"
          className="btn-check"
          name="maxdays"
          id="maxdays"
          autoComplete="off"
          onClick={handleChangeDays}
          value={"max"}
        />
        <label className="btn btn-outline-primary" htmlFor="maxdays">
          max
        </label>
      </div>
      <div className="history">
        <Line options={options} data={dt} />
      </div>
    </>
  );
};
export default HistoryChart;
