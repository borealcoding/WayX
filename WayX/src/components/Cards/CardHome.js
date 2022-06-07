import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CardHome(props) {
  useEffect(() => {
    console.log(props.rut);
  }, []);

  return (
    <Card
      mode="outlined"
      style={styles.card}
      onPress={() =>
        props.nav.navigate("RouteInfo", {
          rut: props.rut,
          user: props.user,
        })
      }
    >
      <View style={styles.img}>
        <Card.Cover source={{ uri: props.rut.images }} style={styles.image} />
      </View>

      <View style={styles.txtContent}>
        <Card.Content style={{ alignItems: "flex-start", marginBottom: 15 }}>
          <Text style={styles.txt}>{props.rut.name}</Text>
          <View style={{flexDirection: "row", marginTop: 5,}}>
            <Icon name="map-marker" color={"#356e6d"} size={26} />
            <Text style={styles.txt}>{props.rut.location}</Text>
          </View>
        </Card.Content>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "90%",
    height: "90%",
    margin: 15,
    borderRadius: 10,
  },

  card: {
    height: 250,
    width: 230,
    marginHorizontal: 15,
    elevation: 15,
    borderRadius: 15,
    borderWidth: 0,
    marginVertical: 20,
  },

  img: {
    flex: 3,
    justifyContent: "center",
    padding: 7,
  },
  txtContent: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  txt: {
    textAlign: "left",
    color: "black",
    fontSize: 17,
    fontFamily: "sans-serif-light",
  },
});
