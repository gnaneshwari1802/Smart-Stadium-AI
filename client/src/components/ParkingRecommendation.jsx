import { useMemo } from "react";

function ParkingRecommendation({ stadiumData }) {
  const recommendation = useMemo(() => {
    if (!stadiumData?.parking) return null;

    const parkingEntries = Object.entries(stadiumData.parking);

    // Sort by occupancy (lowest first)
    const sorted = [...parkingEntries].sort((a, b) => a[1] - b[1]);

    const [bestLot, occupancy] = sorted[0];

    let status = "";
    let color = "";
    let advice = "";

    if (occupancy <= 40) {
      status = "Excellent";
      color = "text-green-600";
      advice = "Plenty of spaces available. This is the recommended parking area.";
    } else if (occupancy <= 70) {
      status = "Good";
      color = "text-yellow-600";
      advice = "Moderate occupancy. You should find a parking spot easily.";
    } else {
      status = "Busy";
      color = "text-red-600";
      advice = "Parking is filling up. Consider arriving early or using alternate parking.";
    }

    return {
      bestLot,
      occupancy,
      available: 100 - occupancy,
      status,
      color,
      advice,
    };
  }, [stadiumData]);

  if (!recommendation) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        🚗 Smart Parking Recommendation
      </h2>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold">
            Recommended Parking Area
          </h3>

          <p className="text-4xl font-bold mt-2">
            Parking {recommendation.bestLot}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-100 p-4 rounded-lg text-center">
            <p className="text-gray-500">Occupied</p>
            <p className="text-2xl font-bold">
              {recommendation.occupancy}%
            </p>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg text-center">
            <p className="text-gray-500">Available</p>
            <p className="text-2xl font-bold">
              {recommendation.available}%
            </p>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg text-center">
            <p className="text-gray-500">Status</p>
            <p className={`text-2xl font-bold ${recommendation.color}`}>
              {recommendation.status}
            </p>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <p>{recommendation.advice}</p>
        </div>
      </div>
    </div>
  );
}

export default ParkingRecommendation;
