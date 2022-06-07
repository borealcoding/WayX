import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { DefaultTheme, List, Searchbar, FAB } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Backdrop from "../../components/Backdrop/Backdrop";
import { locations, routeTypes } from "../../utils/Data/Data";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardExplorar from "../../components/Cards/CardExplorar";

export default function BackdropFilter(props) {
  const { t, i18n } = useTranslation();
  const [focusedBackdrop, setFocusedBackdrop] = useState(true);
  const [routeName, setRouteName] = useState("");
  const [province, setProvince] = useState(props.route.params.user.location);
  const [routeType, setRouteType] = useState(props.route.params.user.typeRoute);
  const [route, setRoutes] = useState([]);
  const [pressSearch, setPressSearch] = useState(false);
  const [pressFilters, setPressFilters] = useState(false);

  useEffect(() => {
    filterByLocationRouteType();
  }, []);

  // explore functions
  const filterByRouteName = async () => {
    console.log("Estoy dentro de SEARCH");
    setPressSearch(false);
    setPressFilters(false);
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"find_name","name":"' + routeName + '"}'
      )
      .then((res) => {
        //console.log(res.data);
        setRoutes(res.data);
        if (res.data != "") {
          setPressSearch(true);
          setPressFilters(false);
        }
      });
    console.log("Valor de province: " + province);
  };

  const filterByLocationRouteType = async () => {
    console.log("Estoy dentro de FILTERROUTE");
    setPressFilters(false);
    setPressSearch(false);
    axios
      .post(
        "http://"+global.serverIp+":"+global.restPort+global.dbName,
        '{"type":"find_location_type","location":"' +
          province +
          '","routeType":"' +
          routeType +
          '"}'
      )
      .then((res) => {
        setRoutes(res.data);
        if (res.data != "") {
          setPressSearch(false);
          setPressFilters(true);
        }
      });
  };

  const returnCards = () => {
    return route.map((item, pos) => {
      return (
        <View key={pos}>
          <CardExplorar
            rut={item}
            nav={props.navigation}
            user={props.route.params.user}
          />
        </View>
      );
    });
  };

  console.log("------------------------------");
  console.log("Province selected: " + province);
  console.log("Route type selected: " + routeType);
  console.log("------------------------------");

  return (
    <View style={styles.container}>
      <View style={styles.fabBackContainer}>
        <FAB
          style={styles.fab}
          color={"white"}
          small
          icon="arrow-left"
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.backdropTitle}>{t("discoverNewWaysLbl")}</Text>
      </View>
      <ScrollView style={{ paddingTop: "25%" }}>
        <View style={styles.viewPicker}>
          <View style={styles.pickerName}>
            <Icon
              name="magnify"
              color={"white"}
              size={26}
              onPress={() => {
                filterByRouteName();
              }}
            />
          </View>
          <TextInput
            style={styles.inputs}
            label="RouteName"
            placeholder={t("searchLbl")}
            underlineColor="transparent"
            multiline
            value={routeName}
            activeOutlineColor="#6d9685"
            onChangeText={(t) => setRouteName(t)}
          />
        </View>
        <View style={styles.viewPicker}>
          <View style={styles.pickerName}>
            <Icon
              name="filter-variant"
              color={"white"}
              size={26}
              onPress={() => {
                filterByLocationRouteType();
                setRouteName("");
              }}
            />
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={province}
              style={styles.pickerElement}
              prompt={t("selectProvince")}
              onValueChange={
                // set province and set search item to province
                (itemValue, itemIndex) => {
                  setProvince(itemValue);
                }
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
        <View style={styles.viewRouteFilters}>
          {routeTypes.map((data, pos) => {
            return (
              <List.Item
                selectedValue={routeType}
                key={pos}
                title={t(data.type)}
                left={(props) => (
                  <List.Icon {...props} icon={data.icon} color={"white"} />
                )}
                // when press on route type, set route type and filter by route type
                onPress={() => {
                  setRouteType(data.type);
                }}
                titleStyle={styles.listTitle}
              />
            );
          })}
        </View>
      </ScrollView>
      <Backdrop
        focused={focusedBackdrop}
        onFocus={() => setFocusedBackdrop(!focusedBackdrop)}
        user={props.route.params.user}
        title={t("pointsOfInterestLbl")}
        icon={
          focusedBackdrop ? (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#000" />
          ) : (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="#000" />
          )
        }
        backdropStyle={styles.backdropStyle}
      >
        <ScrollView>
          {pressFilters || pressSearch ? returnCards() : null}
        </ScrollView>
      </Backdrop>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#326e6c",
  },
  backdropStyle: {
    backgroundColor: "#F4F4F5",
  },
  listTitle: {
    color: "#FFF",
  },
  fabBackContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "5%",
    width: "90%",
  },
  fab: {
    backgroundColor: "#326e6c",
    height: "100%",
  },
  backdropTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewPicker: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  viewRouteFilters: {
    flex: 1,
    paddingLeft: "5%",
  },
  pickerElement: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  pickerName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  picker: {
    borderRadius: 10,
    backgroundColor: "white",
    flex: 4,
    elevation: 12,
  },
  inputs: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 15,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    color: "#484848",
    width: "80%",
  },
  filtersApplied: {
    marginTop: "2%",
    paddingLeft: "2.8%",
  },
});
