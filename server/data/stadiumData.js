export default function stadiumData() {
  const randomize = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    visitors: randomize(10000, 50000),
    
    parking: {
      A: randomize(20, 100),
      B: randomize(20, 100),
      C: randomize(20, 100),
    },

    food: [
      {
        name: "Pizza Hub",
        wait: randomize(2, 15),
      },
      {
        name: "Burger Point",
        wait: randomize(5, 25),
      },
      {
        name: "Coffee Bar",
        wait: randomize(1, 10),
      },
      {
        name: "Ice Cream",
        wait: randomize(2, 12),
      },
      {
        name: "Taco Stand",
        wait: randomize(3, 20),
      },
    ],

    weather: {
      temperature: randomize(22, 35),
      condition: ["Clear Sky", "Partly Cloudy", "Overcast", "Light Rain"][randomize(0, 3)],
    },

    crowd: [
      {
        time: "10 AM",
        crowd: randomize(10, 40),
      },
      {
        time: "11 AM",
        crowd: randomize(30, 60),
      },
      {
        time: "12 PM",
        crowd: randomize(50, 85),
      },
      {
        time: "1 PM",
        crowd: randomize(70, 100),
      },
      {
        time: "2 PM",
        crowd: randomize(50, 80),
      },
      {
        time: "3 PM",
        crowd: randomize(30, 60),
      },
      {
        time: "4 PM",
        crowd: randomize(20, 50),
      },
      {
        time: "5 PM",
        crowd: randomize(40, 70),
      },
    ],
  };
}