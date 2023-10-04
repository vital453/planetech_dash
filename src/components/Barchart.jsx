"use client";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Barchart() {
  const [chartdata, setchartdata] = useState({ datasets: [] });
  const [chartoption, setchartoption] = useState({});
  useEffect(() => {
    setchartdata({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales $",
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    });
    setchartoption({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="w-full relative md:col-span-2 lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartdata} options={chartoption} className="px-4"/>
      </div>
    </>
  );
}
