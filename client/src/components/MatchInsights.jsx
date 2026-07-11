import { useState } from "react";
import api from "../services/api";

function MatchInsights({ stadiumData }) {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    setInsights("");
    try {
      const prompt = `Generate professional match operations insights from:\n${JSON.stringify(stadiumData, null, 2)}`;
      const res = await api.post("/ai/chat", { message: prompt, stadiumData });
      setInsights(res.data.reply);
    } catch {
      setInsights("Unable to generate match insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <button onClick={generateInsights} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold">
        {loading ? "Analyzing..." : "Generate Report"}
      </button>
      {insights && <div className="mt-4 bg-slate-50 border rounded-lg p-5 whitespace-pre-wrap">{insights}</div>}
    </div>
  );
}

export default MatchInsights;
