import axios from "axios";
import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Button,
  IconButton,
  Colors,
  Dialog,
  Provider,
  Portal,
  Paragraph,
} from "react-native-paper";
import {
  locations,
  routeTypes,
  activityTypes,
  activityLevels,
} from "../../utils/Data/Data";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

export default function CreatePoint(props) {
  const { t, i18n } = useTranslation();

  const [image, setImage] = useState();
  const [touchImage, setTouchImage] = useState(false);
  const [imageUser, setImageUser] = useState("");
  const [nameRoute, setNameRoute] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState(t("Valencia"));
  const [routeType, setRouteType] = useState(t("City"));
  const [activityType, setActivityType] = useState(t("Walking"));
  const [activityLevel, setActivityLevel] = useState(t("Beginner"));

  const latitude = props.route.params.coords.lat;
  const longitude = props.route.params.coords.long;

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [imageNotSelected, setImageNotSelected] = useState(false);
  const [nameNotValid, setNameNotValid] = useState(false);
  const [locationNotValid, setLocationNotValid] = useState(false);

  const resetTextInputValues = () => {
    setNameRoute("");
    setDescription("");
    setProvince(t("Valencia"));
    setRouteType(t("City"));
    setActivityType(t("Walking"));
    setActivityLevel(t("Beginner"));
    setImage();
    setImageUser("");
    setTouchImage(false);
  };

  const registerRoute = () => {
    if (!nameNotValid || !imageNotSelected) {
      axios
        .post(
          "http://"+global.serverIp+":"+global.restPort+global.dbName,
          '{"type":"create_route","name":"' +
            nameRoute +
            '","location":"' +
            province +
            '","type_route":"' +
            routeType +
            '","perfectTo":"' +
            activityType +
            '","map":"' +
            latitude +
            "," +
            longitude +
            '","image":"data:image/png;base64,' +
            imageUser +
            '","description":"' +
            description +
            '","dificultyLevel":"' +
            activityLevel +
            '","user_id":' +
            props.route.params.user.id +
            "}"
        )
        .then((res) => {
          // console.log(res.data);
        })
        .catch((res) => {
          console.log("Error");
        });
    }
  };

  const verifyRoute = () => {
    let validName = false;
    let validLocation = false;
    if (nameRoute === "" || nameRoute.length > 25 || nameRoute === " ") {
      setNameNotValid(true);
      console.log("You must enter a name for the route: " + nameNotValid);
    } else {
      setNameNotValid(false);
      validName = true;
    }
    if (latitude === "" || longitude === "") {
      setLocationNotValid(true);
      console.log("You must select a location");
    } else {
      setLocationNotValid(false);
      validLocation = true;
    }
    if (imageUser === "") {
      setImageNotSelected(true);
    } else {
      setImageNotSelected(false);
    }
    console.log("Image not selected: " + imageUser);
    console.log("Is name valid?: " + validName);
    console.log("Is location valid?: " + validLocation);
    if (validName && validLocation && touchImage) {
      registerRoute();
      showDialog();
      console.log("Route created");
    }
  };

  const returnImage = () => {
    if (!touchImage) {
      return (
        <View
          style={
            imageNotSelected
              ? [styles.icnCam, { borderColor: "red", borderWidth: 2 }]
              : styles.icnCam
          }
        >
          <IconButton
            icon="camera"
            color={Colors.black500}
            size={100}
            onPress={() => pickImage()}
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.icnCam} onPress={() => pickImage()}>
          <Image
            source={{ uri: image }}
            style={{ width: 180, height: 180, borderRadius: 10 }}
          />
        </TouchableOpacity>
      );
    }
  };

  const pickImage = async () => {
    // modify the aspect depending on the size of the image
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.15,
    });
    console.log(result.base64);
    setImageUser(result.base64);

    setTouchImage(false);

    if (!result.cancelled) {
      setImage(result.uri);
      setTouchImage(true);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/screenBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Provider style={styles.container}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor="transparent"
        />
        <ScrollView>
          <View style={styles.form}>
            <Text style={styles.advise}>{t("createYourPointLbl")}</Text>
            <View style={styles.flexImagePicker}>{returnImage()}</View>
            <View style={styles.flexContentNameDesc}>
              <TextInput
                style={
                  nameNotValid
                    ? [styles.inputs, { borderColor: "red", borderWidth: 2 }]
                    : styles.inputs
                }
                label="Route name"
                placeholder={t("routeNameLbl")}
                maxLength={25}
                value={nameRoute}
                underlineColor="transparent"
                activeOutlineColor="#6d9685"
                onChangeText={(t) => setNameRoute(t)}
              />
              <TextInput
                style={[styles.inputsDesc, { borderWidth: 0 }]}
                label="Description"
                placeholder={t("descriptionLbl")}
                underlineColor="transparent"
                multiline
                value={description}
                activeOutlineColor="#6d9685"
                onChangeText={(t) => setDescription(t)}
              />
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.defTitle}>{t("locationLbl")}:</Text>
              <Picker
                selectedValue={province}
                style={styles.pickerElement}
                prompt={t("selectProvince")}
                onValueChange={(itemValue, itemIndex) => setProvince(itemValue)}
              >
                {locations.map((data, pos) => {
                  return (
                    <Picker.Item
                      key={pos}
                      // translation provinces in the language selected
                      label={t(data.province)}
                      value={data.province}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={styles.flexContentMap}>
              <View style={styles.flexInputIconButton}>
                <View style={styles.flexInput}>
                  <TextInput
                    style={
                      locationNotValid
                        ? [
                            styles.inputs,
                            { borderColor: "red", borderWidth: 2 },
                          ]
                        : styles.inputs
                    }
                    label="Select a point"
                    value={latitude + ", " + longitude}
                    placeholder={t("selectPoint")}
                    underlineColor="transparent"
                    activeOutlineColor="#6d9685"
                    editable={false}
                  />
                </View>
                <View style={styles.flexButton}>
                  <IconButton
                    icon="map-marker"
                    color={"white"}
                    style={styles.mapButton}
                    size={39}
                    onPress={() =>
                      props.navigation.navigate("PointMap", {
                        nav: props.navigation,
                        coords: {
                          lat: props.route.params.coords.lat,
                          long: props.route.params.coords.long,
                        },
                        user: props.route.params.user,
                      })
                    }
                  />
                </View>
              </View>
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.defTitle}>{t("routeTypeLbl")}:</Text>
              <Picker
                selectedValue={routeType}
                style={styles.pickerElement}
                prompt={t("selectRouteType")}
                onValueChange={(itemValue) => setRouteType(itemValue)}
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
            <View style={styles.flexContent}>
              <Text style={styles.defTitle}>{t("perfectForLbl")}:</Text>
              <Picker
                selectedValue={activityType}
                style={styles.pickerElement}
                prompt={t("activityTypeLbl")}
                onValueChange={(itemValue, itemIndex) =>
                  setActivityType(itemValue)
                }
              >
                {activityTypes.map((data, pos) => {
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
            {routeType === "Mountains" || activityType === "Hiking" ? (
              <View style={styles.flexContent}>
                <Text style={styles.defTitle}>{t("levelsLbl")}</Text>
                <Picker
                  selectedValue={activityLevel}
                  style={styles.pickerElement}
                  prompt={t("selectLevel")}
                  onValueChange={(itemValue, itemIndex) =>
                    setActivityLevel(itemValue)
                  }
                >
                  {activityLevels.map((data, pos) => {
                    return (
                      <Picker.Item
                        key={pos}
                        label={t(data.level)}
                        value={data.level}
                      />
                    );
                  })}
                </Picker>
              </View>
            ) : null}
          </View>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={true}
              zoomControlEnabled={true}
              initialRegion={{
                latitude: 39.47,
                longitude: -0.376389,
                latitudeDelta: 0.09122,
                longitudeDelta: 0.00121,
              }}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.09122,
                longitudeDelta: 0.00121,
              }}
            >
              {
                // if not received data of location, don't show the marker
                latitude !== "" && longitude !== "" && (
                  <Marker
                    title={t("yourPointLbl")}
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                  ></Marker>
                )
              }
            </MapView>
          </View>
          <View style={styles.flexButton}>
            <Button
              style={styles.btnCreate}
              icon="plus"
              mode="text"
              color="white"
              labelStyle={styles.labelButton}
              onPress={() => {
                verifyRoute();
              }}
            >
              {t("createPointBtn")}
            </Button>
          </View>
        </ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={{ textAlign: "center" }}>
              {t("pointCreatedLbl")} 📍
            </Dialog.Title>
            <Dialog.Content style={{ alignItems: "center" }}>
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150, marginBottom: 10 }}
              />
              <Paragraph>
                <Text style={{ fontWeight: "bold" }}>
                  {t("routeNameLbl")}:{" "}
                </Text>
                <Text>{nameRoute}</Text>
              </Paragraph>
              <Paragraph>
                <Text style={{ fontWeight: "bold" }}>
                  {t("descriptionLbl")}:{" "}
                </Text>
                <Text>{description}</Text>
              </Paragraph>
              <Paragraph>
                <Text style={{ fontWeight: "bold" }}>{t("locationLbl")}: </Text>
                <Text>{province}</Text>
              </Paragraph>
              <Paragraph>
                <Text style={{ fontWeight: "bold" }}>
                  {t("routeTypeLbl")}:{" "}
                </Text>
                <Text>{routeType}</Text>
              </Paragraph>
              <Paragraph>
                <Text style={{ fontWeight: "bold" }}>
                  {t("perfectForLbl")}:{" "}
                </Text>
                <Text>{activityType}</Text>
              </Paragraph>
              <Paragraph style={{ marginTop: 20, textAlign: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("messagePointDialog")} ⛰️
                </Text>
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  resetTextInputValues() & hideDialog();
                }}
                color={"#93cab3"}
              >
                {t("okLbl")}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  advise: {
    marginBottom: 40,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  defTitle: {
    marginBottom: 20,
    fontSize: 16,
  },
  form: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%",
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

  inputsDesc: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 15,
    height: 240,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    padding: 0,
    color: "#484848",
  },
  pickerElement: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  flexImagePicker: {
    flex: 1,
    alignItems: "center",
  },
  flexContent: {
    flex: 2,
    width: "80%",
    margin: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 12,
    backgroundColor: "white",
  },
  flexContentMap: {
    flex: 2,
    width: "90%",
    margin: 10,
  },
  flexContentNameDesc: {
    flex: 2,
    width: "90%",
    margin: 10,
  },
  flexInput: {
    flex: 3,
  },
  flexButton: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
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
  mapContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  map: {
    width: "80%",
    height: 300,
    marginTop: "10%",
  },
  btnCreate: {
    margin: 20,
    width: 250,
    height: 60,
    borderRadius: 30,
    elevation: 15,
    paddingTop: 10,
    backgroundColor: "#356e6d",
    alignSelf: "center",
  },
  labelButton: {
    fontSize: 17,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  icnbtn: {
    backgroundColor: "white",
    marginTop: 30,
  },
  icnCam: {
    borderColor: "#D1D1D1",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    borderRadius: 12,
    padding: 5,
    backgroundColor: "white",
    elevation: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#56DACB",
    width: "90%",
    paddingLeft: 20,
    margin: 10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
});
