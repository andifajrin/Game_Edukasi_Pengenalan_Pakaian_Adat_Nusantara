import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SIZES } from "../../constants";
import { COLORS } from "../../constants";

// Sqlite Import
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

const MenuQuiz = ({ navigation }) => {
  //timur
  const [skors1, setSkors1] = useState([]);

  //Tengah
  const [skors2, setSkors2] = useState([]);

  const [skors3, setSkors3] = useState([]);

  const [skorsprogress1, setSkorsPrgoress1] = useState(0);
  const [skorsprogress2, setSkorsPrgoress2] = useState(0);
  const [skorsprogress3, setSkorsPrgoress3] = useState(0);
  const getSkors1 = () => {
    setSkorsPrgoress1(parseInt(((skors1.ganda ?? 0) + (skors1.gambar ?? 0) + (skors1.essay ?? 0)) / 3));
    setSkorsPrgoress2(parseInt(((skors2.ganda ?? 0) + (skors2.gambar ?? 0) + (skors2.essay ?? 0)) / 3));
    setSkorsPrgoress3(parseInt(((skors3.ganda ?? 0) + (skors3.gambar ?? 0) + (skors3.essay ?? 0)) / 3));
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT MAX(value) as value, model FROM skors_timur GROUP BY model",
        null,
        (txObj, { rows: { _array } }) => {
          let skor = {};
          _array.map((v) => {
            if (v.model == "pilihan ganda") {
              skor["ganda"] = v.value;
            } else if (v.model == "pilihan gambar") {
              skor["gambar"] = v.value;
            } else if (v.model == "pilihan essay") {
              skor["essay"] = v.value;
            }
          });
          setSkors1(skor);
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT MAX(value) as value, model FROM skors_tengah GROUP BY model",
        null,
        (txObj, { rows: { _array } }) => {
          let skor = {};
          _array.map((v) => {
            if (v.model == "pilihan ganda") {
              skor["ganda"] = v.value;
            } else if (v.model == "pilihan gambar") {
              skor["gambar"] = v.value;
            } else if (v.model == "pilihan essay") {
              skor["essay"] = v.value;
            }
          });
          setSkors2(skor);
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT MAX(value) as value, model FROM skors_barat GROUP BY model",
        null,
        (txObj, { rows: { _array } }) => {
          let skor = {};
          _array.map((v) => {
            if (v.model == "pilihan ganda") {
              skor["ganda"] = v.value;
            } else if (v.model == "pilihan gambar") {
              skor["gambar"] = v.value;
            } else if (v.model == "pilihan essay") {
              skor["essay"] = v.value;
            }
          });
          setSkors3(skor);
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
    getSkors1();
  });

  //Barat

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: -32,
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#252C4A",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 12,
          paddingVertical: 12,
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: "white",
          }}
        >
          Selesaikan Semua Game Dibawah :
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ModelQuiz", { params: "timur" })}
        style={{
          backgroundColor: COLORS.secondary,
          marginVertical: 12,
          paddingVertical: 12,
          borderRadius: 16,
          alignItems: "center",
          alignContent: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            marginHorizontal: 30,
            fontWeight: "bold",
          }}
        >
          Indonesia Timur
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginHorizontal: 30,
          }}
        >
          Selesai = {skorsprogress1}%
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ModelQuiz", { params: "tengah" })}
        style={{
          backgroundColor: COLORS.secondary,
          marginVertical: 12,
          paddingVertical: 12,
          borderRadius: 16,
          alignItems: "center",
          alignContent: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            marginHorizontal: 30,
            fontWeight: "bold",
          }}
        >
          Indonesia Tengah
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginHorizontal: 30,
          }}
        >
          Selesai = {skorsprogress2}%
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ModelQuiz", { params: "barat" })}
        style={{
          backgroundColor: COLORS.secondary,
          marginVertical: 12,
          paddingVertical: 12,
          borderRadius: 16,
          alignItems: "center",
          alignContent: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            marginHorizontal: 30,
            fontWeight: "bold",
          }}
        >
          Indonesia Barat
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginHorizontal: 30,
          }}
        >
          Selesai = {skorsprogress3}%
        </Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/DottedBG.png")}
        style={{
          width: SIZES.width,
          height: 130,
          zIndex: -1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.5,
        }}
        resizeMode={"contain"}
      />
    </View>
  );
};

export default MenuQuiz;
