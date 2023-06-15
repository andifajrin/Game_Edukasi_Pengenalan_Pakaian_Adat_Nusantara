import React, { useEffect, useState } from "react";
import { View, TextInput, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, ImageBackground } from "react-native";
import { COLORS } from "../constants";
import { SIZES } from "../constants";
// Sqlite Import
import db from "../db/config";
import bg from "../assets/images/BGG.png";

const showModal = (nameshow) => {
  if (nameshow == "") {
    console.log("masukkan nama terlebih dahulu");
    setShowScoreModal(true);
  } else {
    setShowScoreModal(false);
  }
};

const Home = ({ navigation }) => {
  const [nameshow, setNameShow] = useState("");
  const [showScoreModal, setShowScoreModal] = useState(false);

  // input nama
  const userSave = () => {
    if (nameshow == "") {
      // Last Question
      // Show Score Modal
      console.log("masukkan nama terlebih dahulu");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO nama_pengguna (nama) VALUES (?)`,
          [nameshow],
          (txObj, resultSet) => {
            setShowScoreModal(false);
          },
          (txObj, error) => console.log("Error", error)
        );
      });
      // setShowScoreModal(true);
    }
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("create table if not exists skors_timur (id INTEGER PRIMARY KEY AUTOINCREMENT, model text,value int);");
      tx.executeSql("create table if not exists skors_barat (id INTEGER PRIMARY KEY AUTOINCREMENT, model text,value int);");
      tx.executeSql("create table if not exists skors_tengah (id INTEGER PRIMARY KEY AUTOINCREMENT, model text,value int);");

      tx.executeSql("create table if not exists nama_pengguna (id INTEGER PRIMARY KEY AUTOINCREMENT, nama text);");
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT nama FROM nama_pengguna",
        null,
        (txObj, { rows: { _array } }) => {
          console.log(_array);
          if (_array.length == 0) {
            setShowScoreModal(true);
          } else {
            setNameShow(_array[0]["nama"]);
          }
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 0,
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#252C4A",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ImageBackground source={bg} resizeMode="cover" style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
        <View
          style={{
            marginTop: -350,
            flexDirection: "row-reverse",
            alignItems: "center",
            position: "absolute",
            right: 20,
            top: 410,
          }}
        >
          <Image
            source={require("../assets/images/user.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Text style={{ textAlign: "right", fontSize: 18, color: "white" }}>Hai {nameshow} ! </Text>
        </View>

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
              fontSize: 30,
              textAlign: "center",
              color: "white",
            }}
          >
            Menu Utama
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MateriMenu")}
          style={{
            backgroundColor: COLORS.secondary,
            marginVertical: 12,
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Materi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MenuQuiz")}
          style={{
            backgroundColor: COLORS.secondary,
            marginVertical: 12,
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Instruction")}
          style={{
            backgroundColor: COLORS.secondary,
            marginVertical: 12,
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Petunjuk</Text>
        </TouchableOpacity>
      </ImageBackground>
      {/* <Image
          source={require("../assets/images/DottedBG.png")}
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
        /> */}

      {/* //modal input nama */}
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>Masukkan nama anda untuk memulai </Text>
            {/* <Text>{nameshow}</Text> */}
            <TextInput
              style={{
                borderColor: COLORS.secondary + "40",
                backgroundColor: COLORS.secondary + "20",
                borderWidth: 3,
                height: 70,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
                color: COLORS.primary,
                textDecorationStyle: "none",
                fontSize: 20,
                width: "90%",
              }}
              placeholder="Masukkan nama anda"
              placeholderTextColor={COLORS.accent + 70}
              onChangeText={(__text) => setNameShow(__text)}
              value={nameshow}
            />

            <TouchableOpacity
              onPress={userSave}
              style={{
                backgroundColor: COLORS.accent,
                padding: 20,
                width: "90%",
                borderRadius: 20,
                margin: 8,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.white,
                  fontSize: 20,
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
