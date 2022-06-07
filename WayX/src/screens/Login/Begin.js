import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, TextInput } from "react-native";
import { Button, HelperText } from "react-native-paper";
import * as React from "react";
import { Text } from "react-native-paper";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { hex_md5 } from "react-native-md5";
const image = require("../../assets/loginBackground.png");

export default function Begin(props) {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [puls, setPuls] = React.useState({ user: false, pass: false });
  const [colorText, setColorText] = React.useState({
    user: "#326e6c",
    pass: "#326e6c",
  });
  const [error, setError] = React.useState(false);

  const validateUser = async () => {
    var p = hex_md5(password);
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"login","userName":"' + username + '","password":"' + p + '"}'
      )
      .then((res) => {
        // console.log(res.data);
        props.navigation.navigate("BottomTabs", { user: res.data });
      })
      .catch((res) => {
        setPuls({ user: false, pass: false });
        setColorText({ user: "red", pass: "red" });
        setError(true);
      });
  };

  const resetTextInputValues = () => {
    setUsername("");
    setPassword("");
    setError(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
      ></StatusBar>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.empty1}></View>
        <View style={styles.components}>
          <HelperText
            type="error"
            visible={error}
            style={styles.helperTextError}
          >
            {t("wrongUserDataLbl")}
          </HelperText>
          <TextInput
            style={[
              styles.textInputUserValues,
              { borderColor: colorText.user },
            ]}
            label={t("userNameTag")}
            value={username}
            placeholder={t("userNameTag")}
            underlineColor="transparent"
            onChangeText={(username) => setUsername(username)}
            onPressIn={() => setColorText({ user: "#326e6c", pass: "#326e6c" })}
          />
          <TextInput
            style={[
              styles.textInputUserValues,
              { borderColor: colorText.pass },
            ]}
            label={t("passwordLbl")}
            value={password}
            placeholder={t("passwordLbl")}
            underlineColor="transparent"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            onPressIn={() => setColorText({ user: "#326e6c", pass: "#326e6c" })}
          />
        </View>
        <View style={styles.regist}>
          <Button
            style={styles.botonInic}
            icon="login"
            mode="text"
            color="white"
            onPress={() => {
              validateUser();
              resetTextInputValues();
            }}
          >
            {t("signInTag")}
          </Button>

          <Text style={styles.textSingIn}>{t("signInMessage")}</Text>
          <Button
            style={styles.botonRegis}
            icon="account-plus"
            mode="text"
            fontSize="20"
            color="white"
            onPress={() => {
              props.navigation.navigate("Register");
              resetTextInputValues();
            }}
          >
            {t("signUpTag")}
          </Button>
        </View>
        <View style={styles.empty2}></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    flexDirection: "column",
  },
  textInputUserValues: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 12,
    elevation: 15,
    height: 60,
    paddingLeft: 20,
    fontSize: 20,
    color: "#484848",
  },
  helperTextError: {
    marginLeft: 15,
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  empty1: {
    flex: 5,
  },
  empty2: {
    flex: 1,
  },
  components: {
    flex: 3,
  },
  regist: {
    flex: 3,
    padding: 10,
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  textimput: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 15,
    height: 60,
    paddingLeft: 20,
    fontSize: 20,
    color: "#484848",
  },
  botonInic: {
    margin: 20,
    marginTop: 20,
    width: 250,
    height: 60,
    borderRadius: 30,
    elevation: 12,
    paddingTop: 10,
    backgroundColor: "#326e6c",
    alignSelf: "center",
  },
  textSingIn: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    margin: 15,
  },
  botonRegis: {
    margin: 5,
    width: 200,
    height: 45,
    borderRadius: 30,
    fontSize: 15,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
  },
});
