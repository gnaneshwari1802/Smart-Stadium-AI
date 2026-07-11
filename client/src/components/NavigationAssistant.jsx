import { useState } from "react";
import api from "../services/api";

function NavigationAssistant({ stadiumData, selectedLocation }) {
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNavigation = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const locationContext = selectedLocation
        ? `Current location: ${selectedLocation.lat}, ${selectedLocation.lng}`
        : "Current location not selected.";

      const prompt = `${locationContext}\nDestination: ${destination}\nStadium Data:\n${JSON.stringify(stadiumData, null, 2)}\nProvide route guidance.`;
      const res = await api.post("/ai/chat", { message: prompt, stadiumData });
      setResponse(res.data.reply);
    } catch {
      setResponse("Unable to generate navigation guidance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <input
        type="text"
        placeholder="Enter destination"
        className="w-full border rounded-lg p-3"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleNavigation} disabled={loading} className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
        {loading ? "Finding Route..." : "Get Directions"}
      </button>
      {response && <div className="mt-6 bg-slate-100 rounded-lg p-4 whitespace-pre-wrap">{response}</div>}
    </div>
  );
}

export default NavigationAssistant;
