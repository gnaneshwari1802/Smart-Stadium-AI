import { useState } from "react";
import api from "../services/api";

function TournamentControlCenter({ stadiumData }) {
  const [eventName, setEventName] = useState("Cricket League Final");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    setReport("");
    try {
      const prompt = `Event: ${eventName}\nCurrent Stadium Data:\n${JSON.stringify(stadiumData, null, 2)}\nGenerate complete operations report.`;
      const res = await api.post("/ai/chat", { message: prompt, stadiumData });
      setReport(res.data.reply);
    } catch {
      setReport("Unable to generate tournament report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <input className="w-full border rounded-lg p-3 mb-5" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      <button onClick={generatePlan} disabled={loading} className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg">
        {loading ? "Generating..." : "Generate Plan"}
      </button>
      {report && <div className="border rounded-lg bg-slate-50 p-5 whitespace-pre-wrap mt-4">{report}</div>}
    </div>
  );
}

export default TournamentControlCenter;
