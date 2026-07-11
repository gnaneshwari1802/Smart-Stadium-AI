import { useEffect, useState } from "react";
import api from "../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function CrowdChart() {
  const [chartData, setChartData] = useState([]);

  const loadCrowdData = async () => {
    try {
      const res = await api.get("/stadium");

      const visitors = res.data.visitors;

      const now = new Date();

      const time =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      setChartData((prev) => {
        const updated = [
          ...prev,
          {
            time,
            visitors,
          },
        ];

        // Keep only last 10 readings
        if (updated.length > 10) updated.shift();

        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCrowdData();

    const interval = setInterval(() => {
      loadCrowdData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        📈 Live Crowd Density
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CrowdChart;
