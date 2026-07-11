import { useMemo } from "react";

function FoodQueueCard({ food }) {
  const foodData = useMemo(() => {
    if (!food) return [];

    return [...food].sort((a, b) => a.wait - b.wait);
  }, [food]);

  if (!food || foodData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">🍔 Food Court Queue</h2>

        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const fastest = foodData[0];
  const slowest = foodData[foodData.length - 1];

  const averageWait = Math.round(
    foodData.reduce((sum, item) => sum + item.wait, 0) / foodData.length
  );

  const getStatus = (wait) => {
    if (wait <= 5)
      return {
        text: "Fast",
        bar: "bg-green-500",
        badge: "bg-green-100 text-green-700",
      };

    if (wait <= 12)
      return {
        text: "Moderate",
        bar: "bg-yellow-500",
        badge: "bg-yellow-100 text-yellow-700",
      };

    return {
      text: "Busy",
      bar: "bg-red-500",
      badge: "bg-red-100 text-red-700",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🍔 Food Court Queue</h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          Avg {averageWait} min
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Fastest Stall</p>

          <h3 className="font-bold text-lg">{fastest.name}</h3>

          <p className="text-green-600">{fastest.wait} min</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Busiest Stall</p>

          <h3 className="font-bold text-lg">{slowest.name}</h3>

          <p className="text-red-600">{slowest.wait} min</p>
        </div>

      </div>

      <div className="space-y-5">

        {foodData.map((stall) => {

          const status = getStatus(stall.wait);

          return (
            <div key={stall.name}>

              <div className="flex justify-between items-center mb-2">

                <div>
                  <h4 className="font-semibold">
                    {stall.name}
                  </h4>

                  <p className="text-xs text-gray-500">
                    Estimated wait
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}
                >
                  {status.text}
                </span>

              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className={`${status.bar} h-3 rounded-full transition-all duration-700`}
                  style={{
                    width: `${Math.min((stall.wait / 20) * 100, 100)}%`,
                  }}
                />

              </div>

              <div className="flex justify-between mt-1 text-sm text-gray-600">

                <span>{stall.wait} minutes</span>

                <span>
                  {stall.wait <= 5
                    ? "Quick Service"
                    : stall.wait <= 12
                    ? "Normal Queue"
                    : "Long Queue"}
                </span>

              </div>

            </div>
          );
        })}

      </div>

      <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4">

        <h3 className="font-semibold text-blue-700 mb-2">
          AI Recommendation
        </h3>

        <p className="text-gray-700">
          Visit <strong>{fastest.name}</strong> for the shortest waiting
          time of just <strong>{fastest.wait} minutes</strong>.
        </p>

      </div>

    </div>
  );
}

export default FoodQueueCard;
