export const weatherOptions = [
  // Daytime
  {
    Day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.svg", import.meta.url).href,
  },
  {
    Day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href, // Use 'cloudy.svg' for 'clouds' condition
  },
  {
    Day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  {
    Day: true,
    condition: "storm",
    url: new URL("../assets/day/storm.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  {
    Day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  {
    Day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  // Nighttime
  {
    Day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.svg", import.meta.url).href,
  },
  {
    Day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.svg", import.meta.url).href, // Use 'cloudy.svg' for 'clouds' condition
  },
  {
    Day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  {
    Day: false,
    condition: "storm",
    url: new URL("../assets/night/storm.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  {
    Day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
  {
    Day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.svg", import.meta.url).href, // Placeholder, add SVG if missing
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.svg", import.meta.url).href,
    condition: "clear",
    day: true,
  },
  night: {
    url: new URL("../assets/night/default.svg", import.meta.url).href,
    condition: "clear",
    day: false,
  },
};
export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = { latitude: 34.45280, longitude: -112.69518 };

export const apiKey = "afc1006917b1d2ee71377f454f622c0b";

export const BASE_URL = import.meta.env.PROD
  ? "https://api.amoney.minecraftr.us"
  : "http://localhost:3001";
