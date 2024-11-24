import { MaterialCommunityIcons } from "@expo/vector-icons";

export const weatherConditions: Record<string, { color: string; title: string; subtitle: string; icon: string }> = {
  Rain: {
    color: "#005BEA",
    title: "Raining",
    subtitle: "Get a cup of coffee",
    icon: "moderate-rain.png",
  },
  Clear: {
    color: "#f7b733",
    title: "So Sunny",
    subtitle: "It is hurting my eyes",
    icon: "sun.png",
  },
  Thunderstorm: {
    color: "#616161",
    title: "A Storm is coming",
    subtitle: "Because Gods are angry",
    icon: "heavyrain.png",
  },
  Clouds: {
    color: "#1F1C2C",
    title: "Clouds",
    subtitle: "Everywhere",
    icon: "cloud.png",
  },
  // Snow: {
  //   color: "#00d2ff",
  //   title: "Snow",
  //   subtitle: "Get out and build a snowman for me",
  //   icon: "weather-snowy",
  // },
  Drizzle: {
    color: "#076585",
    title: "Drizzle",
    subtitle: "Partially raining...",
    icon: "moderaterain.png",
  },
  Haze: {
    color: "#66A6FF",
    title: "Haze",
    subtitle: "Another name for Partial Raining",
    icon: "moderaterain.png",
  },
  Mist: {
    color: "#3CD3AD",
    title: "Mist",
    subtitle: "Don't roam in forests!",
    icon: "moderaterain.png",
  },
};

export type WeatherCondition = keyof typeof weatherConditions;