import { useMemo } from "react";

const MAX_CAPACITY = 100;

function ParkingCard({ parking }) {
  const parkingData = useMemo(() => {
    if (!parking) return [];

    return Object.entries(parking)
      .map(([name, occupancy]) => ({
        name,
        occupancy,
        available: Math.max(MAX_CAPACITY - occupancy, 0),
      }))
      .sort((a, b) => a.occupancy - b.occupancy);
  }, [parking]);

  if (!parking || parkingData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🚗 Parking Status</h2>

        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const bestParking = parkingData[0];

  const averageOccupancy = Math.round(
    parkingData.reduce((sum, lot) => sum + lot.occupancy, 0) /
      parkingData.length
  );

  const getColor = (value) => {
    if (value < 40)
      return {
        bar: "bg-green-500",
        badge: "bg-green-100 text-green-700",
        status: "Low",
      };

    if (value < 75)
      return {
        bar: "bg-yellow-500",
        badge: "bg-yellow-100 text-yellow-700",
        status: "Moderate",
      };

    return {
      bar: "bg-red-500",
      badge: "bg-red-100 text-red-700",
      status: "High",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🚗 Parking Status</h2>

        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
          Best: Parking {bestParking.name}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Average Occupancy</p>
          <h3 className="text-2xl font-bold">{averageOccupancy}%</h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Parking Areas</p>
          <h3 className="text-2xl font-bold">{parkingData.length}</h3>
        </div>
      </div>

      <div className="space-y-5">
        {parkingData.map((lot) => {
          const color = getColor(lot.occupancy);

          return (
            <div key={lot.name}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-semibold">Parking {lot.name}</h4>

                  <p className="text-xs text-gray-500">
                    Available: {lot.available}%
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${color.badge}`}
                >
                  {color.status}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`${color.bar} h-3 rounded-full transition-all duration-700`}
                  style={{
                    width: `${lot.occupancy}%`,
                  }}
                />
              </div>

              <div className="flex justify-between text-sm mt-1 text-gray-600">
                <span>{lot.occupancy}% Occupied</span>
                <span>{lot.available}% Free</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-700 mb-2">
          AI Parking Recommendation
        </h3>

        <p className="text-gray-700">
          Parking <strong>{bestParking.name}</strong> currently has the
          lowest occupancy ({bestParking.occupancy}%) and offers the
          quickest vehicle entry.
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          Low
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          Moderate
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          High
        </div>
      </div>
    </div>
  );
}

export default ParkingCard;
