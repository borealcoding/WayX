import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTranslation } from "react-i18next";
import Home from "../../../screens/StartPage/Home";
import CreatePoint from "../../../screens/CreatePoint/CreatePoint";
import Profile from "../../../screens/Profile/Profile";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs(props) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(props.route.params.user.userLanguage);
  }, []);


  return (
    <Tab.Navigator
      initialRouteName="StartPage"
      activeColor="#326e6c"
      inactiveColor="#326e6c"
      barStyle={{ backgroundColor: "white", height: 55 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("homeTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={26} />
          ),
          tabBarColor: "#ffffff",
        }}
      />
      <Tab.Screen
        name="Create point"
        component={CreatePoint}
        initialParams={{
          coords: { lat: "", long: "" },
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("createPointTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-plus" color={color} size={26} />
          ),
          tabBarColor: "#ffffff",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          user: props.route.params.user,
        }}
        options={{
          tabBarLabel: t("profileTag"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={26} />
          ),
          tabBarColor: "#ffffff",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
