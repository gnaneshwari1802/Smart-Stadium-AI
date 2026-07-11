// server/services/stadiumService.js

const FOOD_STALLS = [
  "Pizza Hub",
  "Burger Point",
  "Coffee Corner",
  "Ice Cream",
  "Biryani Zone",
  "South Indian",
];

const WEATHER = [
  "Sunny",
  "Cloudy",
  "Partly Cloudy",
  "Rainy",
  "Windy",
];

const MAX_CAPACITY = 56000;

let stadiumState = {};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function currentPhase() {
  const hour = new Date().getHours();

  if (hour < 10) return "Morning";
  if (hour < 13) return "Pre-Match";
  if (hour < 16) return "Kickoff";
  if (hour < 18) return "Halftime";
  if (hour < 21) return "Second Half";

  return "Post Match";
}

function visitorsByPhase() {
  switch (currentPhase()) {
    case "Morning":
      return random(4000, 10000);

    case "Pre-Match":
      return random(22000, 36000);

    case "Kickoff":
      return random(42000, 50000);

    case "Halftime":
      return random(50000, 56000);

    case "Second Half":
      return random(43000, 52000);

    default:
      return random(6000, 14000);
  }
}

function generateParking(visitors) {
  const ratio = visitors / MAX_CAPACITY;

  return {
    A: Math.min(100, Math.round(ratio * 100)),
    B: Math.min(100, Math.round(ratio * 90)),
    C: Math.min(100, Math.round(ratio * 75)),
    D: Math.min(100, Math.round(ratio * 60)),
  };
}

function generateFoodQueues(visitors) {
  const scale = visitors / MAX_CAPACITY;

  return FOOD_STALLS.map((stall) => ({
    name: stall,
    wait: Math.max(2, Math.round(scale * random(4, 22))),
  }));
}

function generateWeather() {
  return {
    temperature: random(24, 37),
    humidity: random(35, 80),
    windSpeed: random(3, 18),
    condition: WEATHER[random(0, WEATHER.length - 1)],
  };
}

function generateCrowd(visitors) {
  if (visitors > 50000) {
    return {
      density: "Very High",
      congestionLevel: "Critical",
      score: 95,
    };
  }

  if (visitors > 40000) {
    return {
      density: "High",
      congestionLevel: "Heavy",
      score: 80,
    };
  }

  if (visitors > 25000) {
    return {
      density: "Medium",
      congestionLevel: "Moderate",
      score: 60,
    };
  }

  return {
    density: "Low",
    congestionLevel: "Light",
    score: 30,
  };
}

function generateNotifications(state) {
  const notifications = [];

  Object.entries(state.parking).forEach(([lot, value]) => {
    if (value > 90) {
      notifications.push({
        id: Date.now() + Math.random(),
        type: "parking",
        severity: "high",
        message: `Parking Lot ${lot} is almost full.`,
        time: new Date().toLocaleTimeString(),
      });
    }
  });

  state.food.forEach((stall) => {
    if (stall.wait > 18) {
      notifications.push({
        id: Date.now() + Math.random(),
        type: "food",
        severity: "medium",
        message: `${stall.name} queue exceeds 18 minutes.`,
        time: new Date().toLocaleTimeString(),
      });
    }
  });

  if (state.weather.temperature > 35) {
    notifications.push({
      id: Date.now() + Math.random(),
      type: "weather",
      severity: "high",
      message: "High temperature detected. Stay hydrated.",
      time: new Date().toLocaleTimeString(),
    });
  }

  return notifications;
}

function createState() {
  const visitors = visitorsByPhase();

  const parking = generateParking(visitors);

  const food = generateFoodQueues(visitors);

  const weather = generateWeather();

  const crowd = generateCrowd(visitors);

  const occupancy = Number(((visitors / MAX_CAPACITY) * 100).toFixed(1));

  const state = {
    timestamp: new Date().toISOString(),

    phase: currentPhase(),

    capacity: MAX_CAPACITY,

    visitors,

    occupancy,

    parking,

    food,

    weather,

    crowd,

    stadiumHealth: Math.max(
      50,
      Math.round(
        100 -
          crowd.score * 0.3 -
          Object.values(parking).reduce((a, b) => a + b, 0) / 15
      )
    ),
  };

  state.notifications = generateNotifications(state);

  return state;
}

function refresh() {
  stadiumState = createState();
  return stadiumState;
}

// initialize
refresh();

export default {
  getState() {
    return stadiumState;
  },

  refresh,
};