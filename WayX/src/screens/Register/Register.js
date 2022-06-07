import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  IconButton,
  Colors,
  Button,
  FAB,
  HelperText,
} from "react-native-paper";
import { locations, routeTypes } from "../../utils/Data/Data";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { hex_md5 } from "react-native-md5";

export default function ImagePickerExample(props) {
  const { t, i18n } = useTranslation();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [image, setImage] = useState();
  const [touchImage, setTouchImage] = useState(false);
  const [province, setProvince] = useState(t("Valencia"));
  const [routeType, setRouteType] = useState(t("City"));
  const [imageUser, setImageUser] = useState("");
  const [samePass, setSamePass] = useState(false);
  const [sameUser, setSameUser] = useState(false);
  const [valEmail, setValEmail] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    props.route.params.user.userLanguage
  );

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch((error) => console.log(error));
  };

  const returnImage = () => {
    if (!touchImage) {
      return (
        <View style={styles.icnCam}>
          <IconButton
            icon="camera"
            color={Colors.black500}
            size={100}
            onPress={() => pickImage()}
            style={styles.imagepicker}
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.icnCam} onPress={() => pickImage()}>
          <Image
            source={{ uri: image }}
            style={{ width: 190, height: 190, borderRadius: 10 }}
          />
        </TouchableOpacity>
      );
    }
  };

  const register = () => {
    if (password === confirmPassword) {
      setSamePass(false);
      if (
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          email
        )
      ) {
        var p = hex_md5(password);
        setValEmail(false);
        axios
          .post(
            "http://"+global.serverIp+":"+global.restPort+global.dbName,
            '{"type":"register","userName":"' +
              name +
              '","password":"' +
              p +
              '","email":"' +
              email +
              '","image":"data:image/png;base64,' +
              imageUser +
              '","location":"' +
              province +
              '","typeRoute":"' +
              routeType +
              '","userLanguage":"' +
              currentLanguage +
              '"}'
          )
          .then((res) => {
            console.log(res.data);
            if (res.data === "Ok") {
              props.navigation.navigate("Begin");
              setSameUser(false);
            } else {
              setSameUser(true);
            }
          })
          .catch((res) => {
            console.log(res.data);
            console.log("Error");
          });
      } else {
        setValEmail(true);
      }
    } else {
      setSamePass(true);
    }
  };

  const pickImage = async () => {
    // modify aspect ratio of image to match camera aspect ratio (4:3) to avoid cropping or stretching of image
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.15, // that controls the quality of the image
    });
    setImageUser(result.base64);
    setTouchImage(true);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/subscreenBackground.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.fabBackContainer}>
          <FAB
            style={styles.fab}
            color={"#326e6c"}
            icon="arrow-left"
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <Image
          source={require("../../assets/bannerRegister.jpg")}
          style={styles.headerContainer}
        />
        <View style={styles.registerContent}>
          <ScrollView style={{ width: "95%" }}>
            <View style={styles.imageContainer}>{returnImage()}</View>
            <View>
              <HelperText
                type="error"
                visible={sameUser}
                style={{ marginLeft: 15 }}
              >
                {t("userNameExistsLbl")}
              </HelperText>
              <TextInput
                style={styles.text_input}
                placeholder={t("nameLbl")}
                value={name}
                onChangeText={(name) => setName(name)}
              />
              <HelperText
                type="error"
                visible={valEmail}
                style={{ marginLeft: 15 }}
              >
                {t("validEmailLbl")}
              </HelperText>
              <TextInput
                style={styles.text_input}
                placeholder={t("emailLbl")}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
              <HelperText
                type="error"
                visible={samePass}
                style={{ marginLeft: 15 }}
              >
                {t("validPasswordLbl")}
              </HelperText>
              <TextInput
                secureTextEntry={true}
                style={styles.text_input}
                placeholder={t("passwordLbl")}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
              <HelperText
                type="error"
                visible={samePass}
                style={{ marginLeft: 15 }}
              >
                {t("validPasswordLbl")}
              </HelperText>
              <TextInput
                secureTextEntry={true}
                style={styles.text_input}
                placeholder={t("confirmPassLbl")}
                value={confirmPassword}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
              <View style={styles.picker}>
                <Text style={styles.textpicker}>{t("locationLbl")}:</Text>
                <Picker
                  selectedValue={province}
                  style={styles.textinpicker}
                  prompt={t("selectProvince")}
                  onValueChange={(itemValue) => setProvince(itemValue)}
                  itemStyle={styles.textinpicker}
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
              <View style={styles.picker}>
                <Text style={styles.textpicker}>{t("routeTypeLbl")}:</Text>
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
              <View style={styles.picker}>
                <Text style={styles.textpicker}>{t("languageLbl")}:</Text>
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
            <Button
              style={styles.registerBtn}
              icon="account-check"
              mode="text"
              color="white"
              onPress={() => register()}
            >
              {t("signUpTag")}
            </Button>
            <Text style={styles.startExploring}>{t("startExploringLbl")}</Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    width: "100%",
    height: "30%",
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "5%",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "100%",
    width: "100%",
  },
  pickerElement: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  picker: {
    width: "90%",
    marginTop: 45,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 12,
    backgroundColor: "white",
  },
  text_input: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 15,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    color: "#484848",
  },
  textpicker: {
    marginTop: 10,
    color: "#A1A1A1",
    fontSize: 20,
  },
  textinpicker: {
    fontSize: 30,
  },
  button: {
    marginTop: 70,
    borderRadius: 200,
    backgroundColor: "green",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icnbtn: {
    backgroundColor: "white",
    marginTop: 30,
  },
  icnCam: {
    borderColor: "#D1D1D1",
    alignItems: "center",
    width: 230,
    height: 230,
    borderRadius: 12,
    justifyContent: "center",
    padding: 5,
    backgroundColor: "white",
    elevation: 15,
  },
  registerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  registerBtn: {
    margin: 20,
    marginTop: 30,
    width: 250,
    height: 60,
    borderRadius: 30,
    paddingTop: 10,
    elevation: 12,
    backgroundColor: "#326e6c",
    alignSelf: "center",
  },
  startExploring: {
    marginTop: 20,
    marginBottom: 60,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
