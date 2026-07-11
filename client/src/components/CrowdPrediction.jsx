import { useState } from "react";
import api from "../services/api";

function CrowdPrediction({ stadiumData }) {
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const predictCrowd = async () => {
    setLoading(true);
    setPrediction("");

    try {
      const prompt = `
You are an AI Crowd Prediction System for a Smart Stadium.
Current Stadium Data:
${JSON.stringify(stadiumData, null, 2)}
Predict crowd for next 30-60 minutes with practical recommendations.
`;

      const res = await api.post("/ai/chat", { message: prompt, stadiumData });
      setPrediction(res.data.reply);
    } catch {
      setPrediction("Unable to generate crowd prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">👥 AI Crowd Prediction</h2>
      <button
        onClick={predictCrowd}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        {loading ? "Analyzing..." : "Predict Crowd"}
      </button>
      {prediction && <div className="mt-6 bg-purple-50 border rounded-lg p-5 whitespace-pre-wrap">{prediction}</div>}
    </div>
  );
}

export default CrowdPrediction;
