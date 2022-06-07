import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { FAB, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";
import axios from "axios";
import WeatherWidget from "../../components/Cards/WeatherWidget";
import { weatherIco } from "../../utils/Data/WeatherIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function RouteInfo(props) {
  const { t, i18n } = useTranslation();
  const [temp, setTemp] = useState("");
  const [tempUnit, setTempUnit] = useState(
    props.route.params.user.temperatureUnit
  );
  const [updateTime, setUpdateTime] = useState("");
  const [location, setLocation] = useState(props.route.params.rut.location);
  const [cityCountry, setCityCountry] = useState("");
  const [wind, setWind] = useState("");
  const [windUnit, setWindUnit] = useState(props.route.params.user.windUnit);
  const [humidity, setHumidity] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [pronosticIcon, setPronosticIcon] = useState(
    "https://raw.githubusercontent.com/ioBroker/ioBroker.openweathermap/HEAD/admin/openweathermap.png"
  );
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [txtCompl, setTxtCompl] = useState(t("markCompletedBtn"));
  const [completed, setCompleted] = useState(false);
  // array with reviews
  const [reviews, setReviews] = useState([]);

  const [detailsVisibility, setDetailsVisibility] = useState(true);
  const [reviewsVisibility, setReviewsVisibility] = useState(false);

  const [reviewTxt, setReviewTxt] = useState("");

  useEffect(() => {
    const [lat, lng] = props.route.params.rut.map.split(",");
    setLatitude(parseFloat(lat));
    setLongitude(parseFloat(lng));
    isCompleted();
    getWeatherInfo();
    showAllRouteReviews();
  }, []);

  // this function is used to open the google maps app with the route
  function openGps(lat, lng) {
    var scheme = Platform.OS === "ios" ? "maps:" : "google.navigation:q=";
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  }

  const isCompleted = () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"isCompleted_route","user_id":' +
          props.route.params.user.id +
          ',"route_id":' +
          props.route.params.rut.id +
          "}"
      )
      .then((res) => {
        if (res.data === "Ok") {
          setCompleted(true);
          setTxtCompl(t("markCompleted"));
        } else {
          setCompleted(false);
          setTxtCompl(t("markCompletedBtn"));
        }
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const visitSite = () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"visited_site_add","user_id":' +
          props.route.params.user.id +
          ',"route_id":' +
          props.route.params.rut.id +
          "}"
      )
      .then((res) => {
        setTxtCompl(t("markCompleted"));
        setCompleted(true);
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const getPronosticIcon = (description) => {
    if (description.includes("claro") || description.includes("despejado")) {
      setPronosticIcon(weatherIco[0]);
    } else if (
      description.includes("nubes") ||
      description.includes("nube") ||
      description.includes("nubosos") ||
      description.includes("nuboso") ||
      description.includes("nubosidad")
    ) {
      setPronosticIcon(weatherIco[1]);
    } else if (
      description.includes("lluvia") ||
      description.includes("lluvias")
    ) {
      setPronosticIcon(weatherIco[2]);
    } else if (
      description.includes("nieve") ||
      description.includes("nevada") ||
      description.includes("nevadas")
    ) {
      setPronosticIcon(weatherIco[3]);
    } else if (
      description.includes("niebla") ||
      description.includes("nieblas") ||
      description.includes("bruma")
    ) {
      setPronosticIcon(weatherIco[4]);
    } else if (
      description.includes("tormenta") ||
      description.includes("tormentas")
    ) {
      setPronosticIcon(weatherIco[5]);
    } else if (
      description.includes("viento") ||
      description.includes("vientos")
    ) {
      setPronosticIcon(weatherIco[6]);
    }
  };

  const getWeatherInfo = () => {
    // https://api.openweathermap.org/data/2.5/weather?q=&appid=6e222653bf09c3ec2cb99d004e9119a1&lang=ES&units=metric
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          location +
          "&appid=6e222653bf09c3ec2cb99d004e9119a1&lang=ES&units=metric"
      )
      .then((response) => {
        //console.log(response.data);
        setTemp(response.data.main.temp);
        setUpdateTime(response.data.dt);
        setCityCountry(response.data.name + ", " + response.data.sys.country);
        setWind(response.data.wind.speed);
        setHumidity(response.data.main.humidity);
        setTempMax(response.data.main.temp_max);
        setTempMin(response.data.main.temp_min);
        setDescription(response.data.weather[0].description);
        getPronosticIcon(response.data.weather[0].description);
      })
      .catch((error) => {
        console.error(error);
      }); // end axios
  };

  const showDetails = () => {
    setDetailsVisibility(true);
    setReviewsVisibility(false);
  };

  const showReviews = () => {
    setDetailsVisibility(false);
    setReviewsVisibility(true);
  };

  const showAllRouteReviews = () => {
    axios
      .post(
        "http://" + global.serverIp + ":"+global.restPort+global.dbName,
        '{"type":"show_reviews","routeId":"' + props.route.params.rut.id + '"}'
      )
      .then((res) => {
        setReviews(res.data);
      });
  };

  const publishReview = () => {
    axios
      .post(
        "http://" + global.serverIp + ":"+global.restPort+global.dbName,
        '{"type":"publish_review","userId":' +
          props.route.params.user.id +
          ',"routeId":' +
          props.route.params.rut.id +
          ',"userReview":"' +
          reviewTxt +
          '"}'
      )
      .then((res) => {
        setReviewTxt("");
      })
      .catch((res) => {
        console.log("DENTRO DE PUBLISH_REVIEW: Error");
      });
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/subscreenBackground.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.fabBackContainer}>
          <FAB
            style={styles.fab}
            color={"#356e6d"}
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.flexImage}>
          <Image
            source={{ uri: props.route.params.rut.images }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.flexTitleStartRoute}>
            <View style={styles.flexTitle}>
              <Text style={styles.info}>{props.route.params.rut.name}</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Icon name="map-marker" color={"#356e6d"} size={26} />
                <Text style={styles.infoLocation}>
                  {props.route.params.rut.location}
                </Text>
              </View>
            </View>
            <View style={styles.flexStartRoute}>
              <Button
                icon="play"
                color={"#356e6d"}
                mode="text"
                onPress={() => openGps(latitude, longitude)}
              >
                {t("startBtn")}
              </Button>
            </View>
          </View>
          <View style={styles.viewSectionButtons}>
            <View style={styles.flexButton}>
              <Button
                style={
                  detailsVisibility
                    ? [styles.btnSection, { backgroundColor: "#356e6d" }]
                    : styles.btnSection
                }
                mode="text"
                color={detailsVisibility ? "white" : "black"}
                labelStyle={styles.labelButton}
                onPress={() => {
                  showDetails();
                }}
              >
                {t("detailsBtn")}
              </Button>
              <Button
                style={
                  reviewsVisibility
                    ? [styles.btnSection, { backgroundColor: "#356e6d" }]
                    : styles.btnSection
                }
                mode="outlined"
                color={reviewsVisibility ? "white" : "black"}
                labelStyle={styles.labelButton}
                onPress={() => {
                  showReviews();
                }}
              >
                {t("reviewsBtn")}
              </Button>
            </View>
          </View>
          {detailsVisibility == true ? (
            <View style={styles.viewDetailsContent}>
              <View style={styles.flexDescrip}>
                <View style={styles.boxContent2}>
                  <View style={styles.boxInfo2}>
                    <Text style={styles.tagTitle}>{t("descriptionLbl")}:</Text>
                  </View>
                  <View style={styles.boxInfo2}>
                    <Text
                      style={[
                        styles.info,
                        {
                          fontFamily: "sans-serif-light",
                          marginLeft: 10,
                          marginRight: 10,
                        },
                      ]}
                    >
                      {props.route.params.rut.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContent}>
                  <View style={styles.boxInfo}>
                    <Text style={styles.tagTitle}>{t("routeTypeLbl")}:</Text>
                    <Text style={styles.info}>
                      {t(props.route.params.rut.type)}
                    </Text>
                  </View>
                  <View style={styles.boxInfo}>
                    <Text style={styles.tagTitle}>{t("perfectForLbl")}:</Text>
                    <Text style={styles.info}>
                      {t(props.route.params.rut.perfectoTo)}
                    </Text>
                  </View>
                </View>
                <View
                  style={
                    props.route.params.rut.dificultyLevel === "null"
                      ? [styles.boxContent, { display: "none" }]
                      : styles.boxContent
                  }
                >
                  <View style={styles.boxInfo}>
                    <Text style={styles.tagTitle}>{t("levelsLbl")}:</Text>
                    <Text style={styles.info}>
                      {t(props.route.params.rut.dificultyLevel)}
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContent2}>
                  <View style={styles.boxInfo2}>
                    <Text style={styles.tagTitle}>
                      {t("currentWeatherLbl")}:
                    </Text>
                  </View>
                  <View style={styles.boxInfo2}></View>
                  <WeatherWidget
                    temp={temp}
                    tempUnit={tempUnit}
                    updateTime={updateTime}
                    cityCountry={cityCountry}
                    wind={wind}
                    windUnit={windUnit}
                    humidity={humidity}
                    tempMax={tempMax}
                    tempMin={tempMin}
                    description={description}
                    pronosticIcon={pronosticIcon}
                  />
                </View>
              </View>
              <View style={styles.flexMap}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  pitchEnabled={false}
                  rotateEnabled={false}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.09122,
                    longitudeDelta: 0.00121,
                  }}
                >
                  <Marker
                    title={t("yourPointLbl")}
                    pinColor="#93cab3"
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                  ></Marker>
                </MapView>
              </View>
              <View style={styles.fabConfirmRoute}>
                <FAB
                  style={styles.fab2}
                  color={"white"}
                  small
                  icon="check-all"
                  label={txtCompl}
                  onPress={() => visitSite()}
                  disabled={completed}
                />
              </View>
            </View>
          ) : reviewsVisibility === true ? (
            <View style={styles.viewReviewsBox}>
              <View style={styles.boxContent2}>
                <View style={styles.boxInfo2}>
                  <Text style={styles.tagTitle}>{t("reviewsBtn")}:</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text
                    style={[
                      styles.info,
                      {
                        fontFamily: "sans-serif-light",
                        marginLeft: 10,
                        marginRight: 10,
                      },
                    ]}
                  >
                    <View style={styles.viewReviewsList}>
                      {reviews.map((index, pos) => {
                        return (
                          <View key={pos} style={{ margin: 10 }}>
                            <Text style={styles.review}>
                              {t("reviewTxt") + " nº " + (pos + 1) + "\n"}
                              {reviews[pos].userReview}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </Text>
                </View>
              </View>
              <View style={styles.flexContentMap}>
                <View style={styles.flexInputIconButton}>
                  <View style={styles.flexInput}>
                    <TextInput
                      style={styles.inputs}
                      label="Route name"
                      placeholder={t("typeAReviewLbl")}
                      underlineColor="transparent"
                      multiline
                      value={reviewTxt}
                      activeOutlineColor="#6d9685"
                      onChangeText={(t) => setReviewTxt(t)}
                    ></TextInput>
                  </View>
                  <View style={styles.flexSendButton}>
                    <IconButton
                      icon="send"
                      color={"white"}
                      style={styles.mapButton}
                      size={39}
                      onPress={() => {
                        publishReview();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
  },
  viewDetailsContent: {},
  viewReviewsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#fefefe",
  },
  viewReviewsBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "5%",
  },
  review: {
    fontSize: 16,
    color: "black",
  },
  inputs: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 15,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    color: "#484848",
  },
  flexContentMap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12%",
  },
  flexInputIconButton: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  mapButton: {
    backgroundColor: "#356e6d",
    borderRadius: 30,
    elevation: 15,
    borderWidth: 0,
  },
  flexInput: {
    flex: 3,
  },
  flexSendButton: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  flexButton: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  scroll: {
    height: 300,
    padding: 10,
  },
  viewSectionButtons: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  flexButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnSection: {
    width: 130,
    height: 30,
    borderRadius: 30,
    elevation: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    fontSize: 10,
    textAlign: "center",
    width: "100%",
  },
  info: {
    fontSize: 20,
    color: "black",
  },
  infoLocation: {
    fontSize: 16,
    fontFamily: "sans-serif-light",
  },
  tagTitle: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  tagTitle2: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  map: {
    width: "80%",
    height: 300,
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "5%",
  },
  fabConfirmRoute: {
    height: 200,
    justifyContent: "center",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  fab2: {
    backgroundColor: "#356e6d",
    elevation: 10,
    height: 60,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  fab3: {
    backgroundColor: "grey",
    elevation: 10,
    height: 60,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  flexImage: {
    flex: 1.5,
    width: "100%",
  },
  flexTitleStartRoute: {
    flex: 0.5,
    flexDirection: "row",
  },
  flexTitle: {
    flex: 2,
    width: "100%",
    padding: 10,
  },
  flexStartRoute: {
    flex: 2,
    overflow: "hidden",
    justifyContent: "center",
  },
  flexDescrip: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  boxContent: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  boxContent2: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  boxInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  boxInfo2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  flexMap: {
    flex: 2,
    alignItems: "center",
    width: "100%",
    marginTop: "5%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
