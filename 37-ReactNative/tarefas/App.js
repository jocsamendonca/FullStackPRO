import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  const [nome, setNome] = useState("Jorge & Gabriel");

  function handleChangeName() {
    setNome("Jocsã Mendonça");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangeName}>
        <Text style={styles.buttonText}>Mudar nome</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    color: "#121212",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
