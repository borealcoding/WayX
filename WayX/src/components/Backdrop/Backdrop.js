import React, { useState, useEffect } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import Subheader from "./Subheader";
import { t } from "i18next";

export default function Backdrop({
  children,
  focused,
  onFocus,
  title,
  icon,
  preset,
  titleStyle,
  backdropStyle,
  props,
}) {
  const [flex, setFlex] = useState(focused ? 1 : 0);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(preset);

    if (focused) {
      setFlex(1);
    } else {
      setFlex(0);
    }
  }, [focused, preset]);

  return (
    <View focusable={focused} pointerEvents="box-none" style={styles.overlay}>
      <View
        style={[styles.backdrop, { flex }, backdropStyle]}
        testID="backdrop"
      >
        <Subheader
          disabled={focused}
          onPress={onFocus}
          icon={icon}
          title={title}
          titleStyle={titleStyle}
          testID="subheader"
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.children}>{children}</View>
        </View>
      </View>
    </View>
  );
}

Backdrop.propTypes = {
  children: PropTypes.node,
  focused: PropTypes.bool,
  onFocus: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  preset: PropTypes.object,
  titleStyle: PropTypes.object,
  backdropStyle: PropTypes.object,
};

Backdrop.defaultProps = {
  children: null,
  focused: true,
  icon: null,
  preset: LayoutAnimation.Presets.easeInEaseOut,
  titleStyle: {},
  backdropStyle: {},
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "flex-end",
  },
  backdrop: {
    marginTop: "75%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  children: {
    marginHorizontal: 0,
    flex: 1,
  },
});
