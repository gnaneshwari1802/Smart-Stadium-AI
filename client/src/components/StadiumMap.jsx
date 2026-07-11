import React from "react";

const getLevelColor = (value) => {
  if (value >= 75) return "bg-red-500";
  if (value >= 40) return "bg-yellow-500";
  return "bg-green-500";
};

const getTextLevel = (value) => {
  if (value >= 75) return "High";
  if (value >= 40) return "Moderate";
  return "Low";
};

const Zone = ({ name, value, position }) => (
  <div className={`absolute ${position} w-24 h-16 rounded-lg ${getLevelColor(value)} text-white shadow-md flex flex-col items-center justify-center`}>
    <p className="text-xs font-semibold">Parking {name}</p>
    <p className="text-sm font-bold">{value}%</p>
    <p className="text-[10px]">{getTextLevel(value)}</p>
  </div>
);

const StadiumMap = ({ parking = { A: 0, B: 0, C: 0 } }) => {
  const A = Number.isFinite(Number(parking?.A)) ? Number(parking.A) : 0;
  const B = Number.isFinite(Number(parking?.B)) ? Number(parking.B) : 0;
  const C = Number.isFinite(Number(parking?.C)) ? Number(parking.C) : 0;

  return (
    <div className="w-full">
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-44 h-44 rounded-full border-8 border-slate-400 bg-slate-300 flex items-center justify-center shadow-inner">
            <span className="text-sm font-bold text-slate-700">STADIUM</span>
          </div>
        </div>

        <Zone name="A" value={A} position="top-6 left-10" />
        <Zone name="B" value={B} position="top-6 right-10" />
        <Zone name="C" value={C} position="bottom-8 left-1/2 -translate-x-1/2" />
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span>Low</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span>Moderate</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span>High</div>
      </div>
    </div>
  );
};

export default StadiumMap;
