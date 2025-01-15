import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import * as Clipboard from "expo-clipboard";
import {useExpoPushToken} from './hooks/expoPushToken';

const App = () => {
   const deviceToken = useExpoPushToken();
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Push Token:</Text>
         <Text style={styles.token}>{deviceToken || "Fetching token..."}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  token: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  warning: {
    color: "red",
    fontSize: 14,
    marginTop: 20,
  },
});

export default App;
