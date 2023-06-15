import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SIZES } from "../../constants";
import { COLORS } from "../../constants";
import db from "../../db/config";

const ModelQuiz = ({ navigation, route }) => {
  const [skors, setSkors] = useState([]);
  const [skorsprogress, setSkorsPrgoress] = useState(0);

  const getSkor = () => {
    let nilai = parseInt(((skors.ganda ?? 0) + (skors.gambar ?? 0) + (skors.essay ?? 0)) / 3);
    setSkorsPrgoress(nilai);
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT MAX(value) as value, model FROM skors_${route.params?.params} GROUP BY model`,
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
          setSkors(skor);
          getSkor();
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
  });

  return (
    <View
      style={{
        paddingHorizontal: 50,
        marginTop: -60,
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
            textAlign: "left",
            color: "white",
          }}
        >
          Berikut Model Quiz :
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(`Quiz`, { params: route.params?.params })}
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
            fontSize: 20,
            marginHorizontal: 30,
            fontWeight: "bold",
          }}
        >
          Pilihan Ganda
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginHorizontal: 30,
          }}
        >
          Skor = {skors.ganda ?? 0}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("TebakGambar", { params: route.params?.params })}
        style={{
          backgroundColor: COLORS.secondary,
          marginVertical: 12,
          paddingVertical: 12,
          borderRadius: 16,
          alignItems: "center",
          alignContent: "center",
          // flexDirection: "row",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            MarginHorizontal: 30,
            fontWeight: "bold",
          }}
        >
          Benar Salah
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginHorizontal: 30,
          }}
        >
          Skor = {skors.gambar ?? 0}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Essay", { params: route.params?.params })}
        style={{
          backgroundColor: COLORS.secondary,
          marginVertical: 12,
          paddingVertical: 12,
          borderRadius: 16,
          alignItems: "center",
          alignContent: "center",
          // flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginHorizontal: 30,
          }}
        >
          Essay
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginHorizontal: 30,
          }}
        >
          Skor = {skors.essay ?? 0}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 20,
          textAlign: "center",
          paddingTop: 60,
        }}
      >
        Progress : {skorsprogress}% dari 100%
      </Text>

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

export default ModelQuiz;
