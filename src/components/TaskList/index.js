import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TaskList({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Tarefa: {data?.task}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    paddingTop: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
