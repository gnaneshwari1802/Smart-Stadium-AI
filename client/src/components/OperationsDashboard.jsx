import { useMemo } from "react";

function OperationsDashboard({ stadiumData }) {
  const report = useMemo(() => {
    if (!stadiumData) return null;

    const parkingValues = Object.values(stadiumData.parking || {});
    const averageParking =
      parkingValues.reduce((sum, value) => sum + value, 0) /
      parkingValues.length;

    const highestParking = Object.entries(stadiumData.parking || {}).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const longestQueue = [...(stadiumData.food || [])].sort(
      (a, b) => b.wait - a.wait
    )[0];

    const actions = [];

    if (stadiumData.visitors > 45000)
      actions.push("Increase crowd management staff.");

    if (averageParking > 75)
      actions.push("Open overflow parking area.");

    if (highestParking?.[1] >= 90)
      actions.push(`Redirect vehicles away from Parking ${highestParking[0]}.`);

    if (longestQueue?.wait >= 15)
      actions.push(`Deploy extra staff at ${longestQueue.name}.`);

    if (stadiumData.weather.temperature >= 35)
      actions.push("Provide additional drinking water stations.");

    if (actions.length === 0)
      actions.push("All stadium operations are running normally.");

    return {
      visitors: stadiumData.visitors,
      avgParking: averageParking.toFixed(1),
      highestParking,
      longestQueue,
      weather: stadiumData.weather,
      actions,
    };
  }, [stadiumData]);

  if (!report) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        🏟 Stadium Operations Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="font-semibold">Visitors</h3>
          <p className="text-3xl font-bold">{report.visitors.toLocaleString()}</p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="font-semibold">Average Parking</h3>
          <p className="text-3xl font-bold">{report.avgParking}%</p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="font-semibold">Highest Parking Usage</h3>
          <p className="text-xl">
            Parking {report.highestParking?.[0]} ({report.highestParking?.[1]}%)
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="font-semibold">Longest Queue</h3>
          <p className="text-xl">
            {report.longestQueue?.name} ({report.longestQueue?.wait} mins)
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg md:col-span-2">
          <h3 className="font-semibold">Weather</h3>
          <p>
            {report.weather.temperature}°C • {report.weather.condition}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">
          📋 Recommended Actions
        </h3>

        <ul className="space-y-3">
          {report.actions.map((action, index) => (
            <li
              key={index}
              className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded"
            >
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OperationsDashboard;
