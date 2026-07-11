import { useState } from "react";
import api from "../services/api";

function EmergencyAssistant({ stadiumData }) {
  const [incident, setIncident] = useState("Medical Emergency");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const incidentTypes = ["Medical Emergency", "Fire Outbreak", "Crowd Stampede", "Security Threat", "Lost Child", "Power Failure", "Heavy Rain"];

  const handleEmergency = async () => {
    setLoading(true);
    try {
      const prompt = `Emergency: ${incident}\nCurrent Stadium Data:\n${JSON.stringify(stadiumData, null, 2)}\nProvide actionable emergency response plan.`;
      const res = await api.post("/ai/chat", { message: prompt, stadiumData });
      setResponse(res.data.reply);
    } catch {
      setResponse("Unable to generate emergency response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">🚨 Emergency Assistant</h2>
      <select value={incident} onChange={(e) => setIncident(e.target.value)} className="w-full border rounded-lg p-3">
        {incidentTypes.map((item) => <option key={item}>{item}</option>)}
      </select>
      <button onClick={handleEmergency} disabled={loading} className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
        {loading ? "Analyzing..." : "Generate Response"}
      </button>
      {response && <div className="mt-6 bg-red-50 border rounded-lg p-5 whitespace-pre-wrap">{response}</div>}
    </div>
  );
}

export default EmergencyAssistant;
