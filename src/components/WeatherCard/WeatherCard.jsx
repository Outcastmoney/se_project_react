import "./WeahterCard.css";
import { weatherOptions } from "../../utils/constants";
function WeatherCard({ weatherData }) {
  const normalizeCondition = (condition) => {
    if (!condition) return "";
    return condition.toLowerCase();
  };

  const filteredOption = weatherOptions.filter((option) => {
    const optionCondition = normalizeCondition(option.condition);
    const weatherCondition = normalizeCondition(weatherData.condition);

    const isDayMatch = option.Day === weatherData.isDay;
    const isConditionMatch =
      optionCondition.includes(weatherCondition) ||
      weatherCondition.includes(optionCondition);

    return isDayMatch && isConditionMatch;
  });

  let weatherOption = filteredOption[0];
  if (!weatherOption) {
    weatherOption =
      weatherOptions.find((option) => option.Day === weatherData.isDay) ||
      weatherOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherData.isDay ? "day" : "night"} time ${
          weatherOption?.condition || ""
        }`}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
