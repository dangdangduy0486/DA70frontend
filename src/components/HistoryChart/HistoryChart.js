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
import "./HistoryChart.css";
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
      <div className="container_days">
        <button
          style={{
            backgroundColor: days === 7 ? "rgba(53, 162, 235, 0.5)" : "white",
          }}
          className="btn-days"
          onClick={(e) => {
            setDays(7);
          }}
        >
          7days
        </button>
        <button
          style={{
            backgroundColor: days === 14 ? "rgba(53, 162, 235, 0.5)" : "white",
          }}
          className="btn-days"
          onClick={(e) => {
            setDays(14);
          }}
        >
          14days
        </button>
        <button
          style={{
            backgroundColor: days === 30 ? "rgba(53, 162, 235, 0.5)" : "white",
          }}
          className="btn-days"
          onClick={(e) => {
            setDays(30);
          }}
        >
          30days
        </button>
        <button
          style={{
            backgroundColor: days === 90 ? "rgba(53, 162, 235, 0.5)" : "white",
          }}
          className="btn-days"
          onClick={(e) => {
            setDays(90);
          }}
        >
          90days
        </button>
        <button
          style={{
            backgroundColor: days === 180 ? "rgba(53, 162, 235, 0.5)" : "white",
          }}
          className="btn-days"
          onClick={(e) => {
            setDays(180);
          }}
        >
          180days
        </button>
        <button
          style={{
            backgroundColor:
              days === "max" ? "rgba(53, 162, 235, 0.5)" : "white",
          }}
          className="btn-days"
          onClick={(e) => {
            setDays("max");
          }}
        >
          Max
        </button>
      </div>
      <div className="history">
        <Line options={options} data={dt} />
      </div>
    </>
  );
};
export default HistoryChart;
