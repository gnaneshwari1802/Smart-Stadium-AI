import { Cloud, CloudRain, Sun, CloudSnow, Wind } from "lucide-react";

function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-8 w-40 bg-gray-200 rounded mb-6"></div>

        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-gray-200 rounded-full"></div>

          <div className="space-y-3">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const {
    temperature,
    condition,
    humidity = 68,
    windSpeed = 12,
    feelsLike = temperature,
  } = weather;

  const getIcon = () => {
    const text = condition.toLowerCase();

    if (text.includes("clear") || text.includes("sun"))
      return <Sun size={70} className="text-yellow-500" />;

    if (text.includes("cloud"))
      return <Cloud size={70} className="text-gray-500" />;

    if (text.includes("rain"))
      return <CloudRain size={70} className="text-blue-500" />;

    if (text.includes("snow"))
      return <CloudSnow size={70} className="text-cyan-500" />;

    return <Sun size={70} className="text-yellow-500" />;
  };

  const getStatus = () => {
    if (temperature >= 35)
      return {
        color: "text-red-600",
        message: "High Temperature",
      };

    if (temperature >= 28)
      return {
        color: "text-yellow-600",
        message: "Pleasant Weather",
      };

    return {
      color: "text-green-600",
      message: "Comfortable",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          🌤 Weather
        </h2>

        <span
          className={`font-semibold ${status.color}`}
        >
          {status.message}
        </span>

      </div>

      <div className="flex items-center gap-6">

        {getIcon()}

        <div>

          <h3 className="text-5xl font-bold">
            {temperature}°C
          </h3>

          <p className="text-gray-600 text-lg mt-2">
            {condition}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-slate-50 rounded-xl p-4 text-center">

          <p className="text-gray-500 text-sm">
            Humidity
          </p>

          <h3 className="text-xl font-bold">
            {humidity}%
          </h3>

        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-center">

          <p className="text-gray-500 text-sm">
            Feels Like
          </p>

          <h3 className="text-xl font-bold">
            {feelsLike}°C
          </h3>

        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-center">

          <Wind className="mx-auto text-blue-600 mb-2" />

          <h3 className="text-xl font-bold">
            {windSpeed}
          </h3>

          <p className="text-gray-500 text-sm">
            km/h
          </p>

        </div>

      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">

        <h3 className="font-semibold text-blue-700 mb-2">
          Weather Advisory
        </h3>

        <p className="text-gray-700">

          {temperature >= 35
            ? "High temperatures are expected. Ensure visitors stay hydrated and use shaded seating areas."
            : temperature >= 28
            ? "Weather conditions are suitable for outdoor activities with good visibility."
            : "Comfortable weather conditions are expected throughout the event."}

        </p>

      </div>

    </div>
  );
}

export default WeatherCard;
