import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import firebase from "./../../services/firebaseConnection";

export default function Login({ changeStatus }) {
  const [type, setType] = useState("login");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    if (type === "login") {
      if (email && password) {
        const user = firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            changeStatus(user?.user?.uid);
            setIsLoading(false);
          })
          .catch((error) => {
            alert("Ops! Parece que tivemos um problema ao realizar o login");
            setIsLoading(false);
            return;
          });
      } else {
        setIsLoading(false);
        alert("Por favor, verifique as informações preenchidas!");
      }
    } else {
      if (
        email &&
        password &&
        password.length >= 6 &&
        password === passwordConfirmation
      ) {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            changeStatus(user?.user?.uid);
            setIsLoading(false);

            alert("Cadastro realizado com sucesso!");
          })
          .catch((error) => {
            setIsLoading(false);
            alert("Ops! Parece que tivemos um problema ao criar sua conta.");
            return;
          });
      } else {
        if (password && password.length < 6) {
          alert("A senha deve ter no mínimo 6 caracteres!");
        } else if (password !== passwordConfirmation) {
          alert("As senhas não são iguais!");
        } else {
          alert("Por favor, verifique as informações preenchidas!");
        }
        setIsLoading(false);
        return;
      }
    }
  };

  const handleCreate = () => {
    setType(type === "login" ? "create" : "login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="Ex: joao@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="************"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        {type !== "login" && (
          <TextInput
            placeholder="Confirme sua senha"
            value={passwordConfirmation}
            onChangeText={(text) => setPasswordConfirmation(text)}
            style={styles.input}
          />
        )}
        <TouchableOpacity
          style={[
            styles.btnLogin,
            { backgroundColor: type === "login" ? "#3ea6f2" : "#141414" },
          ]}
          onPress={handleLogin}
        >
          {isLoading ? (
            <ActivityIndicator width={25} height={25} color={"#FFF"} />
          ) : (
            <Text style={styles.textLogin}>
              {type === "login" ? "Login" : "Cadastrar"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreate}>
          <Text style={styles.textCreate}>
            {type === "login"
              ? "Criar conta"
              : "Já possui uma conta? Fazer login"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  content: {
    gap: 10,
    maxWidth: 350,
    width: "100%",
  },
  input: {
    padding: 10,
    backgroundColor: "#FFF",
    borderColor: "#141414",
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
  },
  btnLogin: {
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogin: {
    color: "#FFF",
    textAlign: "center",
  },
  textCreate: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
