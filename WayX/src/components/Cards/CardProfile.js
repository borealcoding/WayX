import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function CardProfile(props) {
  const image = props.background;
  const title = props.title;
  const itemData = props.data;
  const show = props.onPress;

  useEffect(() => {
    console.log(props.rut);
  }, []);

  return (
    <Card mode="outlined" style={styles.card} onPress={show}>
      <View style={styles.img}>
        <Card.Cover source={image} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>{title}</Text>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.txtInfo}>{
              typeof itemData === "number" ?
                <Text style={[styles.txtInfo, { fontSize: 30}]}>{itemData}</Text> :
                <Text style={styles.txtInfo}>{itemData}</Text>
            }</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 15,
    elevation: 15,
    borderRadius: 15,
    borderWidth: 0,
    marginVertical: 20,
    height: "120%",
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    zIndex: 100,
    height: "100%",
  },
  viewTitle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  viewInfo: {
    flex: 1.5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    margin: 15,
    borderRadius: 10,
  },
  img: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
  txtInfo: {
    textAlign: "center",
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
});
