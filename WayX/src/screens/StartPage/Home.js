import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { Avatar, Searchbar } from "react-native-paper";
import CardHome from "../../components/Cards/CardHome";
import { useTranslation } from "react-i18next";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home(props) {
  const { t, i18n } = useTranslation();
  const [routeClose, setRoutesClose] = useState([]);
  const [routePreferences, setRoutePreferences] = useState([]);
  const [countRoute, setCountRoute] = useState("");
  const [close, setClose] = useState(false);
  const [pref, setPref] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState(props.route.params.user);

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const getUser = () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"user_by_id","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
    closeToYou();
    preferences();
    countRoutes();
    getUser();
  }, []);

  useEffect(() => {
    closeToYou();
    preferences();
    countRoutes();
    getUser();
  }, []);

  const closeToYou = async () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"home_location","id":"' + props.route.params.user.id + '"}'
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data != "]") {
          setRoutesClose(res.data);
          setClose(true);
        }
      });
  };

  const preferences = async () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"home_type","id":"' + props.route.params.user.id + '"}'
      )
      .then((res) => {
        if (res.data != "]") setRoutePreferences(res.data);
        setPref(true);
      });
  };

  const countRoutes = async () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"user_visited_counter","user_id":"' +
          props.route.params.user.id +
          '"}'
      )
      .then((res) => {
        // console.log("Count: " + res.data);
        setCountRoute(res.data);
      });
  };

  console.log(global.serverIp);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/screenBackground.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <View style={styles.headerInfoUser}>
              <View style={styles.userAvatar}>
                <Avatar.Image
                  source={{ uri: user.image }}
                  size={50}
                  style={styles.ava}
                ></Avatar.Image>
              </View>
              <View style={styles.viewGreetingUserTxt}>
                <Text style={styles.greetingUserTxt}>
                  {t("helloLbl") + ", " + user.userName}
                </Text>
              </View>
            </View>
            <View style={styles.viewSearchBar}>
              <View style={styles.searchBarTitle}>
                <Text style={styles.txt}>{t("findYourWayLbl")}</Text>
              </View>
              <Searchbar
                style={styles.searchBar}
                placeholder={t("searchPlacesLbl")}
                onChangeText={onChangeSearch}
                value={searchQuery}
                showSoftInputOnFocus={false}
                onPressIn={() => {
                  props.navigation.navigate("BackdropFilter", {
                    user: props.route.params.user,
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.homeContent}>
            <View style={styles.viewContent}>
              <View style={styles.scroll1}>
                <Text style={styles.txt}>{t("closeToYouLbl")}</Text>
                <ScrollView horizontal={true}>
                  {close
                    ? routeClose.map((index, pos) => {
                        return (
                          <View key={pos}>
                            <CardHome
                              rut={index}
                              nav={props.navigation}
                              user={props.route.params.user}
                            />
                          </View>
                        );
                      })
                    : null}
                </ScrollView>
              </View>
              <View>
                <View style={styles.dataView}>
                  <Text style={styles.dataTxt}>{countRoute}</Text>
                </View>
                <View style={styles.empty1}>
                  <Text style={styles.dataTxt2}>{t("completedRoutesLbl")}</Text>
                </View>
              </View>
              <View style={styles.scroll2}>
                <Text style={styles.txt}>{t("basedOnYourPreferencesLbl")}</Text>
                <ScrollView horizontal={true}>
                  {pref
                    ? routePreferences.map((index, pos) => {
                        return (
                          <View key={pos}>
                            <CardHome
                              rut={index}
                              nav={props.navigation}
                              user={props.route.params.user}
                            />
                          </View>
                        );
                      })
                    : null}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
  },
  headerInfoUser: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    height: 80,
  },
  userAvatar: {
    marginLeft: 20,
    marginRight: 10,
  },
  ava: {
    borderWidth: 0,
    elevation: 15,
    shadowColor: "#356e6d",
  },
  viewGreetingUserTxt: {},
  greetingUserTxt: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
  },
  viewSearchBar: {
    flex: 2,
    flexDirection: "column",
    width: "100%",
    padding: 30,
  },
  searchBar: {
    borderRadius: 10,
    elevation: 15,
    shadowColor: "#356e6d",
  },
  searchBarTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  data: {
    borderWidth: 3,
    borderColor: "red",
    flexDirection: "row",
  },
  dataTxt: {
    textAlign: "center",
    color: "#356e6d",
    fontSize: 160,
    fontFamily: "sans-serif-light",
    marginBottom: 15,
    elevation: 15,
    shadowColor: "#356e6d",
  },
  dataTxt2: {
    width: 120,
    textAlign: "left",
    color: "#727272",
    fontSize: 15,
    paddingLeft: 20,
  },
  dataView: {
    flex: 2,
  },
  empty1: {
    position: "absolute",
    top: "23%",
    right: 0,
  },
  titleLogo: {
    flex: 1,
    paddingRight: 20,
  },
  scroll1: {
    marginTop: 20,
    height: 350,
  },
  scroll2: {
    marginTop: 20,
    height: 350,
  },
  viewContent: {
    flex: 1,
  },
  homeContent: {
    flex: 2,
    flexDirection: "row",
  },
  txt: {
    flex: 1,
    color: "#262626",
    fontSize: 20,
    marginLeft: 20,
  },
  logo: {
    height: 50,
    width: 100,
    marginTop: 40,
    marginLeft: 25,
  },
  snackBar: {
    marginLeft: -10,
    width: "95%",
  },
  ViewDown: {
    backgroundColor: "#C70039",
    flex: 0.25,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
