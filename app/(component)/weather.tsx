import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { WeatherCondition, weatherConditions } from "./WeatherConditions";
import { WEATHER_API } from "@/services/WEATHER_API";
import {Region} from "react-native-maps";

interface WeatherData {
  temperature: number;
  weather: string;
}

async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const apiKey = WEATHER_API; // Replace with your FreeWeather API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
    console.log(apiUrl)
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();

    // Extracting required information
    const temperature = data?.current?.temp_c; // Assuming the API provides temp under `main.temp`
    const weatherDescription = data?.current?.condition?.text; // Assuming the weather description is under `weather[0].description`

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

function Weather( currLocation : Region) {
  const [weather, setWeather] = useState("Rain");
  const [temperature, setTemperature] = useState(-10);

  console.log(currLocation)

  useEffect(() => {

    getWeatherData(currLocation.location.latitude, currLocation.location.longitude)
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
      <Image
        source={require("../../assets/images/weather/mist.png" )}
        style={styles.logo}
      />
      <Text style={styles.tempText}>{temperature}˚</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    flexDirection: "row",
  },
  tempText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "300",
    marginHorizontal: 10,
  },
  logo: {
    width: 25,
    height: 25,
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
    color: "#000",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Weather;
