import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { WeatherCondition, weatherConditions } from "./WeatherConditions";

interface WeatherData {
  temperature: number;
  weather: string;
}

async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const apiKey = "KEY"; // Replace with your FreeWeather API key
    const apiUrl = `https://api.freeweatherapi.com/v1/weather?lat=${latitude}&lon=${longitude}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();

    // Extracting required information
    const temperature = data?.main?.temp; // Assuming the API provides temp under `main.temp`
    const weatherDescription = data?.weather?.[0]?.description; // Assuming the weather description is under `weather[0].description`

    if (temperature !== undefined && weatherDescription) {
      return {
        temperature,
        weather: weatherDescription,
      };
    } else {
      console.error("Unexpected data format:", data);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}

function Weather({ currLocation }: any) {
  const [weather, setWeather] = useState("Rain");
  const [temperature, setTemperature] = useState(23);

  useEffect(() => {
    getWeatherData(currLocation.latitude, currLocation.longitude)
      .then((weather) => {
        if (weather) {
          setTemperature(weather.temperature);
          console.log(weather.weather);
          if (weather.weather in weatherConditions) {
            setWeather(weather.weather);
          } else {
            setWeather("Rain");
          }
        }
      })
      .catch(() => {});
  }, [currLocation]);

  return (
    <View style={styles.weatherContainer}>
      <View>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
      </View>
      <View>
        <Text style={styles.tempText}>{temperature}˚</Text>
        {weatherConditions[weather].icon}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tempText: {
    fontSize: 72,
    color: "#fff",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 60,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Weather;
