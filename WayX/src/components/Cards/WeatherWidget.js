import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";

export default function WeatherWidget(props) {
  const { t, i18n } = useTranslation();
  const temp = props.temp,
    tempUnit = props.tempUnit;
  const updateTime = props.updateTime;
  const date = new Date(updateTime),
    hour = date.getHours(),
    min = date.getMinutes();
  const updateTimeFormatted = `${hour}:${min}`;
  const currentlyDate = new Date().getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = t(days[currentlyDate]);
  const cityCountry = props.cityCountry;
  const wind = props.wind,
    windUnit = props.windUnit;
  const humidity = props.humidity;
  const tempMax = props.tempMax;
  const tempMin = props.tempMin;
  const description = props.description;
  const pronosticIcon = props.pronosticIcon;

  useEffect(() => {
    console.log(props.rut);
  }, []);

  return (
    <Card mode="outlined" style={styles.card}>
      <View style={styles.img}>
        <Card.Cover style={styles.cardCover} />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#346b67", "#46918b", "#59b7b0"]}
          style={styles.cardContent}
        >
          <View style={styles.viewMainData}>
            <View style={[styles.viewData, { flex: 1, justifyContent: "center", alignItems: "flex-end" }]}>
              <Text style={[styles.textData, { fontWeight: "bold"}]}>{dayName}</Text>
            </View>
            <View
              style={[styles.viewData, { flex: 2, alignItems: "center" }]}
            >
              {
                tempUnit === "F" ? (
                  <Text
                    style={[
                      styles.textData,
                      { fontSize: 50, fontWeight: "bold" },
                    ]}
                  >
                    {Math.round(temp * 1.8 + 32) + "º" + tempUnit}
                  </Text>
                ) : tempUnit === "K" ? (
                  <Text
                    style={[
                      styles.textData,
                      { fontSize: 50, fontWeight: "bold" },
                    ]}
                  >
                    {Math.round(temp - 273.15) + "º" + tempUnit}
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textData,
                      { fontSize: 50, fontWeight: "bold" },
                    ]}
                  >
                    {Math.round(temp) + "º" + tempUnit}
                  </Text>
                )
              }
            </View>
            <View style={[styles.viewData]}>
              <Text style={[styles.textData]}>
                {t("lastUpdatedLbl") + ": " + updateTimeFormatted}
              </Text>
            </View>
            <View style={[styles.viewData]}>
              <View style={styles.transparentBorder}>
                <Icon name="map-marker" color={"white"} size={26} />
              </View>
              <View style={styles.transparentBorder}>
                <Text style={[styles.textData]}>{cityCountry}</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewExtendedData}>
            <View style={[styles.viewData]}>
              <Icon name="weather-windy" color={"white"} size={26} />
              <Text style={[styles.textData, { fontWeight: "bold" }]}>
                {Math.round(wind) + " " + windUnit}
              </Text>
            </View>
            <View style={[styles.viewData]}>
              <Icon name="water-percent" color={"white"} size={26} />
              <Text style={[styles.textData, { fontWeight: "bold" }]}>
                {Math.round(humidity) + "%"}
              </Text>
            </View>
            <View style={[styles.viewData]}>
              <Icon name="thermometer-plus" color={"white"} size={26} />
              <Text style={[styles.textData, { fontWeight: "bold" }]}>
                {Math.round(tempMax) + "º" + tempUnit}
              </Text>
            </View>
            <View style={[styles.viewData]}>
              <Icon name="thermometer-minus" color={"white"} size={26} />
              <Text style={[styles.textData, { fontWeight: "bold" }]}>
                {Math.round(tempMin) + "º" + tempUnit}
              </Text>
            </View>
          </View>
          <View style={styles.viewGraphicIcon}>
            <View style={[styles.viewData, { flex: 2 }]}>
              <Image
                style={{ width: 80, height: 80 }}
                source={{
                  uri: pronosticIcon,
                }}
              />
            </View>
            <View style={[styles.viewData, { alignItems: "flex-start" }]}>
              <Text style={[styles.textData]}>{description}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 15,
    elevation: 15,
    borderRadius: 15,
    borderWidth: 0,
    marginVertical: 20,
    height: 200,
    marginBottom: 40,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    zIndex: 100,
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  viewMainData: {
    flex: 1.5,
  },
  viewExtendedData: {
    flex: 1,
  },
  viewGraphicIcon: {
    flex: 1,
  },
  viewData: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textData: {
    color: "white",
    fontFamily: "sans-serif-light",
  },
  viewTitle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  viewInfo: {
    flex: 1.5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  cardCover: {
    backgroundColor: "transparent",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    margin: 15,
    borderRadius: 10,
  },
  img: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
  txtInfo: {
    textAlign: "center",
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
  transparentBorder: {
    borderColor: "transparent",
    borderWidth: 3,
  },
});
