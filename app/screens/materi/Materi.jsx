import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image } from "react-native";
import { COLORS } from "../../constants";
import materi from "../../data/materi";
import { SIZES } from "../../constants";

const Materi = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {materi[0][route.params?.params].map((materi, index) => {
            return (
              <View key={index}>
                <Text style={styles.judul}>
                  {index + 1}. {materi.judul}
                </Text>
                <View style={styles.contgambar}>
                  <Image style={styles.gambar} resizeMode={"stretch"} source={materi.gambar} />
                </View>
                <Text style={styles.text}>
                  {"\n"}
                  {materi.isi}
                  {"\n"}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
          opacity: 0.3,
        }}
        resizeMode={"contain"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.primary,
  },
  scrollView: {
    backgroundColor: "transparent",
    marginHorizontal: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  text: {
    textAlign: "justify",
    fontSize: 18,
    color: "white",
    paddingTop: 0,
  },
  judul: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 20,
  },
  text2: {
    textAlign: "justify",
    fontSize: 18,
    color: "white",
    paddingTop: 15,
  },
  contgambar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  gambar: {
    width: 400,
    height: 310,
  },
});

export default Materi;
