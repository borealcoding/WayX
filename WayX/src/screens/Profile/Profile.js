import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from "react-native";
import {
  Provider,
  Button,
  Avatar,
  Modal,
  Portal,
  FAB,
} from "react-native-paper";
import CardExplorar from "../../components/Cards/CardExplorar";
import CardProfile from "../../components/Cards/CardProfile";
import { useTranslation } from "react-i18next";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Profile(props) {
  const { t, i18n } = useTranslation();
  const [visibleCreatedRoutes, setVisibleCreatedRoutes] = useState(false);
  const [visibleCompletedRoutes, setVisibleCompletedRoutes] = useState(false);
  const [visitSites, setVisitSites] = useState([]);
  const [yourRoutes, setYourRoutes] = useState([]);
  const [location, setLocation] = useState(props.route.params.user.location);
  const [routeType, setRouteType] = useState(props.route.params.user.typeRoute);
  const [createdRoutes, setCreatedRoutes] = useState(false);
  const [completedRoutes, setCompletedRoutes] = useState(false);
  const [countCreatedRoutes, setCountCreatedRoutes] = useState(0);
  const [countCompletedRoutes, setCountCompletedRoutes] = useState(0);
  const [user, setUser] = useState(props.route.params.user);
  const [refreshing, setRefreshing] = React.useState(false);

  const showDialogCreatedRoutes = () => setVisibleCreatedRoutes(true);
  const hideDialogCreatedRoutes = () => setVisibleCreatedRoutes(false);
  const showDialogCompletedRoutes = () => setVisibleCompletedRoutes(true);
  const hideDialogCompletedRoutes = () => setVisibleCompletedRoutes(false);

  const getUser = () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"user_by_id","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
    returnVisitedSites();
    returnYourRoutes();
    getUser();
  }, []);

  useEffect(() => {
    returnVisitedSites();
    returnYourRoutes();
    getUser();
  }, []);

  const returnYourRoutes = () => {
    console.log(
      "http://"+global.serverIp+":"+global.restPort+global.dbName,
      '{"type":"user_routes","user_id":' + props.route.params.user.id + "}"
    );
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"user_routes","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        if (res.data != "[") {
          setCountCreatedRoutes(res.data.length);
          setCompletedRoutes(true);
          setYourRoutes(res.data);
          // console.log("Your Routes: " + res.data[1].id);
        } else {
          setCompletedRoutes(false);
        }
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const returnVisitedSites = () => {
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"user_visited","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        if (res.data != "[") {
          setCountCompletedRoutes(res.data.length);
          setCreatedRoutes(true);
          setVisitSites(res.data);
        } else {
          setCreatedRoutes(false);
        }
      })
      .catch((res) => {
        console.log("Error");
      });
  };


  return (
    <Provider style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/screenBackground.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.fabBackContainer}>
            <FAB
              style={styles.fab}
              color={"#326e6c"}
              icon="account-cog-outline"
              onPress={() =>
                props.navigation.navigate("ProfileSettings", {
                  user: user,
                })
              }
            />
          </View>
          <View style={styles.viewAvatar}>
            <Avatar.Image
              source={{ uri: user.image }}
              size={150}
              style={styles.ava}
            ></Avatar.Image>
          </View>
          <View style={styles.viewUserProfile}>
            <View style={styles.viewUsername}>
              <Text style={styles.userNameText}>{user.userName}</Text>
            </View>
            <View style={styles.viewUsername}>
              <Text style={styles.userBioText}>{user.userBio}</Text>
            </View>
            <View style={styles.viewData}>
              <View style={styles.viewEmailAndUserBio}>
                <View style={styles.viewBtn}>
                  <Button
                    style={[styles.outlinedBtn, { borderColor: "#326e6c" }]}
                    mode="contained"
                    color="#326e6c"
                  >
                    <Text>{user.email}</Text>
                  </Button>
                </View>
              </View>
              <View style={styles.flexCards}>
                <View style={styles.viewLocationRouteType}>
                  <CardProfile
                    background={require("../../assets/locationWidget.jpg")}
                    title={t("locationLbl")}
                    data={location}
                  />
                  <CardProfile
                    background={require("../../assets/routeTypeWidget.jpg")}
                    title={t("routePreferenceLbl")}
                    data={routeType}
                  />
                </View>
                <View style={styles.viewCreatedCompletedPoints}>
                  <CardProfile
                    background={require("../../assets/createdPointsWidget.jpg")}
                    title={t("createdRoutesLbl")}
                    data={countCreatedRoutes}
                    onPress={showDialogCreatedRoutes}
                  />
                  <CardProfile
                    background={require("../../assets/completedPointsWidget.jpg")}
                    title={t("completedRoutesLbl")}
                    data={countCompletedRoutes}
                    onPress={showDialogCompletedRoutes}
                  />
                </View>
              </View>
              <Portal>
                <Modal
                  visible={visibleCreatedRoutes}
                  onDismiss={hideDialogCreatedRoutes}
                  style={styles.modal}
                >
                  <ScrollView>
                    {completedRoutes
                      ? yourRoutes.map((i, p) => {
                          console.log(i.id + p);
                          return (
                            <CardExplorar
                              key={p}
                              rut={i}
                              nav={props.navigation}
                              user={user}
                            />
                          );
                        })
                      : null}
                  </ScrollView>
                </Modal>
              </Portal>
              <Portal>
                <Modal
                  visible={visibleCompletedRoutes}
                  onDismiss={hideDialogCompletedRoutes}
                  style={styles.modal}
                >
                  <ScrollView>
                    {createdRoutes
                      ? visitSites.map((item, pos) => {
                          return (
                            <CardExplorar
                              key={pos}
                              rut={item}
                              nav={props.navigation}
                              user={user}
                            />
                          );
                        })
                      : null}
                  </ScrollView>
                </Modal>
              </Portal>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  provider: {
    marginTop: 25,
  },
  scroll: {
    marginTop: "15%",
    height: 280,
    backgroundColor: "transparent",
    color: "blue",
  },
  flexCards: {
    flex: 1,
    flexDirection: "column",
  },
  viewLocationRouteType: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 30,
  },
  viewCreatedCompletedPoints: {
    flexDirection: "row",
    padding: 10,
  },
  outlinedBtn: {
    margin: 15,
    borderRadius: 30,
    fontSize: 16,
    alignSelf: "center",
    elevation: 15,
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "1%",
    right: "5%",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    flex: 25,
    color: "grey",
    textAlign: "right",
    marginTop: 10,
  },
  modal: {
    alignSelf: "center",
    width: "90%",
    height: "90%",
    marginLeft: 20,
  },
  text3: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    color: "black",
  },
  viewEmailAndUserBio: {
    justifyContent: "center",
  },
  menu: {
    flex: 1,
  },
  btnView: {
    flex: 2.5,
    flexDirection: "column",
    height: 100,
  },
  fondo: {
    margin: 1,
  },
  viewAvatar: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ava: {
    borderWidth: 0,
    elevation: 12,
    marginTop: 30,
  },
  viewUsername: {
    flex: 1,
    alignItems: "center",
    margin: "5%",
  },
  userNameText: {
    textAlign: "center",
    color: "#3d4953",
    fontWeight: "bold",
    fontSize: 30,
  },
  userBioText: {
    textAlign: "center",
    color: "#326e6c",
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  viewUserProfile: {
    marginBottom: "20%",
  },
  viewData: {
    flex: 6,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  imagen: {
    height: 300,
    width: 350,
  },
  boto2: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#56DACB",
    width: 110,

    fontSize: 20,
  },
  textMenu: {
    textAlign: "center",
    color: "grey",
    justifyContent: "center",
  },
  textMenu2: {
    textAlign: "center",
    color: "black",
    margin: 10,
  },
});
