import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { Menu, Avatar, Button, FAB } from "react-native-paper";
import { locations, routeTypes } from "../../utils/Data/Data";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";

export default function ProfileSettings(props) {
  const [userBio, setUserBio] = useState(props.route.params.user.userBio);
  const [name, setName] = useState(props.route.params.user.userName);
  const [email, setEmail] = useState(props.route.params.user.email);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    props.route.params.user.userLanguage
  );
  const [province, setProvince] = useState(props.route.params.user.location);
  const [routeType, setRouteType] = useState(props.route.params.user.typeRoute);
  const [imageUser, setImageUser] = useState("");
  const [image, setImage] = useState();
  const [touchImage, setTouchImage] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState(
    props.route.params.user.temperatureUnit
  );
  const [distanceUnit, setDistanceUnit] = useState(
    props.route.params.user.distanceUnit
  );
  const [windUnit, setWindUnit] = useState(props.route.params.user.windUnit);

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, []);

  const returnImage = () => {
    if (!touchImage) {
      return (
        <View style={styles.background02}>
          <Avatar.Image
            source={{ uri: props.route.params.user.image }}
            size={120}
            style={styles.ava}
            onTouchStart={() => pickImage()}
          ></Avatar.Image>
        </View>
      );
    } else {
      return (
        <View style={styles.background02}>
          <Avatar.Image
            source={{ uri: image }}
            size={120}
            style={styles.ava}
            onTouchStart={() => pickImage()}
          ></Avatar.Image>
        </View>
      );
    }
  };

  const pickImage = async () => {
    // modify aspect ratio of image
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImageUser(result.base64);

    if (!result.cancelled) {
      setTouchImage(true);
      setImage(result.uri);
    }
  };
  
  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch((error) => console.log(error));
  };

  const deleteUser = () => {
    console.log("http://"+global.serverIp+":"+global.restPort+global.dbName, {
      data:
        '{"type":"delete_profile","user_id":' +
        props.route.params.user.id +
        "}",
    });
    axios
      .delete("http://"+global.serverIp+":"+global.restPort+global.dbName, {
        data: {
          type: "delete_profile",
          user_id: props.route.params.user.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        props.navigation.navigate("Begin");
      })
      .catch((res) => {
        console.log("Error");
      });
  };
  const update = () => {
    if (!touchImage) {
      axios
        .put(
          "http://"+global.serverIp+":"+global.restPort+global.dbName,
          '{"type":"update_profile","userName":"' +
            name +
            '","password":"' +
            props.route.params.user.password +
            '","email":"' +
            email +
            '","image":"' +
            props.route.params.user.image +
            '","location":"' +
            province +
            '","type_route":"' +
            routeType +
            '","userLanguage":"' +
            currentLanguage +
            '","temperatureUnit":"' +
            temperatureUnit +
            '","distanceUnit":"' +
            distanceUnit +
            '","windUnit":"' +
            windUnit +
            '","userBio":"' +
            userBio +
            '","user_id":' +
            props.route.params.user.id +
            "}"
        )
        .then((res) => {
          console.log(res.data);
          props.navigation.navigate("BottomTabs", {
            user: props.route.params.user,
          });
        })
        .catch((res) => {
          console.log("Error");
        });
    } else {
      axios
        .put(
          "http://"+global.serverIp+":"+global.restPort+global.dbName,
          '{"type":"update_profile","userName":"' +
            name +
            '","password":"' +
            props.route.params.user.password +
            '","email":"' +
            email +
            '","image":"data:image/png;base64,' +
            imageUser +
            '","location":"' +
            province +
            '","type_route":"' +
            routeType +
            '","userLanguage":"' +
            currentLanguage +
            '","temperatureUnit":"' +
            temperatureUnit +
            '","distanceUnit":"' +
            distanceUnit +
            '","windUnit":"' +
            windUnit +
            '","userBio":"' +
            userBio +
            '","user_id":' +
            props.route.params.user.id +
            "}"
        )
        .then((res) => {
          console.log(res.data);
          props.navigation.navigate("BottomTabs", {
            user: props.route.params.user,
          });
        })
        .catch((res) => {
          console.log("Error");
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/subscreenBackground.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.fabBackContainer}>
            <FAB
              style={styles.fab}
              color={"#326e6c"}
              icon="arrow-left"
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{t("settingsLbl")}</Text>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.imageContent}>{returnImage()}</View>
            <View style={styles.textImageContent}>
              <Text style={styles.textImage}>{t("profileImageLbl")}</Text>
            </View>
          </View>
          <View style={styles.image2}>
            <View style={styles.fondo3}>
              <View style={styles.bordes}>
                <Menu.Item title={t("bioLbl")} style={styles.menu} />
                <TextInput
                  style={styles.text_input}
                  value={userBio}
                  onChangeText={(t) => setUserBio(t)}
                />
              </View>
              <View style={styles.bordes}>
                <Menu.Item title={t("nameLbl")} style={styles.menu} />
                <TextInput
                  style={styles.text_input}
                  value={name}
                  onChangeText={(t) => setName(t)}
                />
              </View>
              <View style={styles.bordes}>
                <Menu.Item title={t("emailLbl")} style={styles.menu} />
                <TextInput
                  style={styles.text_input}
                  value={email}
                  onChangeText={(t) => setEmail(t)}
                />
              </View>
              <View style={styles.bordes} />
              <View style={styles.viewPicker}>
                <View style={styles.pickerName}>
                  <TextInput>{t("locationLbl")}</TextInput>
                </View>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={province}
                    style={styles.pickerElement}
                    prompt={t("selectProvince")}
                    onValueChange={(itemValue, itemIndex) =>
                      setProvince(itemValue)
                    }
                  >
                    {locations.map((data, pos) => {
                      return (
                        <Picker.Item
                          key={pos}
                          label={t(data.province)}
                          value={data.province}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.viewPicker}>
                <View style={styles.pickerName}>
                  <TextInput>{t("routeTypeLbl")}</TextInput>
                </View>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={routeType}
                    style={styles.pickerElement}
                    prompt={t("selectRouteType")}
                    onValueChange={(itemValue, itemIndex) =>
                      setRouteType(itemValue)
                    }
                  >
                    {routeTypes.map((data, pos) => {
                      return (
                        <Picker.Item
                          key={pos}
                          label={t(data.type)}
                          value={data.type}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.viewPicker}>
                <View style={styles.pickerName}>
                  <Text>{t("languageLbl")}</Text>
                </View>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={currentLanguage}
                    style={styles.pickerElement}
                    prompt={t("selectLanguage")}
                    value={currentLanguage}
                    onValueChange={(itemValue, itemIndex) => {
                      setCurrentLanguage(itemValue);
                      changeLanguage(itemValue);
                    }}
                  >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Valencià" value="va" />
                    <Picker.Item label="Aranés" value="oc" />
                    <Picker.Item label="Galego" value="gl" />
                    <Picker.Item label="Euskera" value="eu" />
                    <Picker.Item label="Castellano" value="es" />
                    <Picker.Item label="Català" value="ca" />
                    <Picker.Item label="Asturianu" value="as" />
                    <Picker.Item label="Aragonés" value="ar" />
                  </Picker>
                </View>
              </View>
              <View style={styles.bordes} />
              <View style={styles.viewMeasures}>
                <View style={styles.measureUnit}>
                  <Text style={{ marginBottom: 10 }}>
                    {t("temperatureLbl")}
                  </Text>
                  <View style={[styles.viewPicker, { width: 110 }]}>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={temperatureUnit}
                        style={styles.pickerElement}
                        prompt={t("selectTemperatureUnitLbl")}
                        value={temperatureUnit}
                        onValueChange={(itemValue, itemIndex) => {
                          setTemperatureUnit(itemValue.toUpperCase());
                        }}
                      >
                        <Picker.Item label="C" value="C" />
                        <Picker.Item label="F" value="F" />
                        <Picker.Item label="K" value="K" />
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={styles.measureUnit}>
                  <Text style={{ marginBottom: 10 }}>{t("distanceLbl")}</Text>
                  <View style={[styles.viewPicker, { width: 110 }]}>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={distanceUnit}
                        style={styles.pickerElement}
                        prompt={t("selectDistanceUnitLbl")}
                        value={distanceUnit}
                        onValueChange={(itemValue, itemIndex) => {
                          setDistanceUnit(itemValue.toLowerCase());
                        }}
                      >
                        <Picker.Item label="km" value="km" />
                        <Picker.Item label="mi" value="mi" />
                        <Picker.Item label="nm" value="nm" />
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={styles.measureUnit}>
                  <Text style={{ marginBottom: 10 }}>{t("windLbl")}</Text>
                  <View style={[styles.viewPicker, { width: 110 }]}>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={windUnit}
                        style={styles.pickerElement}
                        prompt={t("selectWindUnitLbl")}
                        value={windUnit}
                        onValueChange={(itemValue, itemIndex) => {
                          setWindUnit(itemValue.toLowerCase());
                        }}
                      >
                        <Picker.Item label="km/h" value="km/h" />
                        <Picker.Item label="mi/h" value="mi/h" />
                        <Picker.Item label="m/s" value="m/s" />
                      </Picker>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.viewBtn}>
                <Button
                  style={[styles.outlinedBtn, { borderColor: "#326e6c" }]}
                  icon="logout"
                  mode="outlined"
                  color="#326e6c"
                  onPress={() => props.navigation.navigate("Begin")}
                >
                  <Text> {t("signOutLbl")}</Text>
                </Button>
              </View>
              <View style={styles.viewBtn}>
                <Button
                  style={[styles.outlinedBtn, { borderColor: "#DC143C" }]}
                  icon="delete"
                  mode="outlined"
                  color="#DC143C"
                  onPress={() => deleteUser()}
                >
                  <Text>{t("deleteAccountLbl")}</Text>
                </Button>
              </View>
              <View style={styles.fabConfirmRoute}>
                <Button
                  style={styles.saveChangesBtn}
                  icon="content-save-edit"
                  mode="text"
                  color="white"
                  onPress={() => update()}
                >
                  {t("saveChangesBtn")}
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContent: {
    flex: 1,
  },
  textImageContent: {
    flex: 1,
  },
  textImage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#326e6c",
    textAlign: "center",
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    height: "30%",
    marginBottom: 40,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  headerText: {
    color: "#0f2120",
    fontWeight: "bold",
    fontSize: 30,
    marginRight: "10%",
    marginTop: "20%",
  },
  scroll: {
    height: 280,
    backgroundColor: "transparent",
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "10%",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  fabConfirmRoute: {
    justifyContent: "center",
    marginTop: 10,
  },
  outlinedBtn: {
    margin: 15,
    width: 200,
    height: 45,
    borderRadius: 30,
    fontSize: 15,
    backgroundColor: "transparent",
    borderWidth: 2,
    alignSelf: "center",
  },
  saveChangesBtn: {
    width: 250,
    height: 60,
    borderRadius: 30,
    paddingTop: 10,
    elevation: 12,
    backgroundColor: "#326e6c",
    alignSelf: "center",
  },
  viewMeasures: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  measureUnit: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  viewBtn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  boto2: {
    margin: 5,
    backgroundColor: "transparent",
    color: "#56DACB",
    width: "80%",
    height: 50,
    justifyContent: "center",
    fontSize: 25,
  },
  viewPicker: {
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 20,
  },
  pickerElement: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  pickerName: {
    justifyContent: "center",
    flex: 3,
  },
  picker: {
    borderRadius: 10,
    backgroundColor: "white",
    flex: 4,
    elevation: 12,
  },
  text1: {
    flex: 2,
    color: "grey",
    textAlign: "right",
    marginTop: 10,
  },
  text_input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderColor: "#56DACB",
    borderRadius: 10,
    height: 50,
    fontSize: 15,
    color: "black",
    maxWidth: 350,
    minWidth: 100,
    alignSelf: "flex-end",
    elevation: 12,
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
  bordes: {
    borderColor: "#D1D1D1",
    borderTopWidth: 1,
    paddingVertical: 15,
    marginLeft: 1,
    marginRight: 1,
    justifyContent: "flex-end",
  },
  menu: {
    flex: 1,
    width: 300,
    alignSelf: "flex-start",
    paddingHorizontal: 0,
  },
  btnView: {
    flex: 1,
    flexDirection: "column",
    height: 100,
  },
  fondo: {
    margin: 1,
  },
  background02: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ava: {
    borderWidth: 0,
    elevation: 12,
  },
  fondoname: {
    flex: 1,
    alignItems: "center",
  },
  text2: {
    textAlign: "center",
    color: "#146464",
    fontSize: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  image2: {
    flex: 2,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  fondo3: {
    flex: 6,
    padding: 10,
  },
});
