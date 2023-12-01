import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState("");

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  const taskList = [
    { key: 1, task: "Limpar o carro" },
    { key: 2, task: "Limpar a casa" },
    { key: 3, task: "Estudar React Native" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxInput}>
        <TextInput
          placeholder="O que você vai fazer hoje?"
          style={styles.input}
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <TaskList data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    paddingTop: 25,
  },
  boxInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#141414",
    borderRightWidth: 0,
    borderBottomStartRadius: 5,
    borderTopStartRadius: 5,
    padding: 10,
    height: 45,
    color: "#141414",
  },
  btn: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
    backgroundColor: "#3ea6f2",
    borderWidth: 2,
    borderColor: "#141414",
    borderLeftWidth: 0,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
});
