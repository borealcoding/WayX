import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function PointMap(props) {
  const { t, i18n } = useTranslation();
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(39.47);
  const [longitude, setLongitude] = useState(-0.376389);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getSpecificLocation = async (data, details = null) => {
    /**
     * Get specific location from google places api
     * @param {string} data - data from google places api
     * @param {object} details - details from google places api
     * @returns {object} - location object
     */
    let location = await Location.geocodeAsync(data.description);
    setLocation(location);
    setLatitude(location[0].latitude);
    setLongitude(location[0].longitude);
    setMarker(location[0]);
  };

  const getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      // extract the latitude and longitude
      let { latitude, longitude } = location.coords;
      text = JSON.stringify(location);
      setLatitude(latitude);
      setLongitude(longitude);
    }
    console.log("Location information: " + text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fabBackContainer}>
        <FAB
          style={styles.fab}
          color={"#326e6c"}
          icon="arrow-left"
          onPress={() => props.route.params.nav.navigate("BottomTabs")}
        />
      </View>
      <View style={styles.fabSaveContainer}>
        <FAB
          style={styles.fab}
          color={"#326e6c"}
          icon="content-save"
          onPress={() =>
            props.route.params.nav.navigate("BottomTabs") &
            props.route.params.nav.setParams({
              coords: {
                lat: latitude,
                long: longitude,
              },
              user: props.route.params.user,
            })
          }
        />
      </View>
      <View style={styles.viewSearchBar}>
        <GooglePlacesAutocomplete
          styles={{
            textInputContainer: {
              backgroundColor: "rgba(0,0,0,0)",
              width: "100%",
              borderRadius: 12,
              elevation: 12,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 50,
              color: "#5d5d5d",
              fontSize: 16,
              borderRadius: 12,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
          placeholder={t("searchLbl")}
          query={{
            key: global.googlePlacesApiKey, // google places api key
            language: "es", // language of the results
          }}
          onPress={(data, details = null) => {
            console.log(data);
            getSpecificLocation(data, details);
          }}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsBuildings={true}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09122,
          longitudeDelta: 0.00121,
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01122,
          longitudeDelta: 0.00121,
        }}
        onPress={(e) => {
          setMarker(e.nativeEvent.coordinate);
          setLatitude(e.nativeEvent.coordinate.latitude);
          setLongitude(e.nativeEvent.coordinate.longitude);
        }}
      >
        {
          // if state contains marker variable with a value, show a marker on the map
          marker && (
            <Marker
              pinColor="#326e6c"
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={t("yourPointLbl")}
            />
          )
        }
      </MapView>
      <View style={styles.fabLocationContainer}>
        <FAB
          style={styles.fab}
          color={"#326e6c"}
          icon="crosshairs-gps"
          onPress={() => getUserLocation()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  viewSearchBar: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    backgroundColor: "transparent",
    width: "60%",
  },
  map: {
    position: "relative",
    zIndex: 50,
    width: Dimensions.get("window").width,
    height: "100%",
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "4%",
  },
  fabSaveContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    right: "3%",
  },
  fabLocationContainer: {
    position: "absolute",
    zIndex: 100,
    bottom: "12%",
    right: "5%",
  },
  fab: {
    backgroundColor: "white",
    elevation: 12,
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
