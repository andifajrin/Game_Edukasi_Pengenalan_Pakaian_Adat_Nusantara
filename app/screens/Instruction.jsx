import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import { COLORS } from "../constants";

const Instruction = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Petunjuk</Text>
      <Text style={styles.textIsi}>
        Untuk memulai, silahkan menuju halaman utama/home terlebih dahulu, kemudian pilih menu materi untuk menyimak semua materi yang ada, kemudian setelah menyimak materi, silahkan kembali ke menu utama kemudian pilih menu kuis untuk
        menguji tingkat pemahaman anda.
      </Text>
      <Text style={styles.textIsi}>
        Ada tiga pembagian kuis berdasarkan 3 wilayah indonesia, yaitu menu kuis indonesia bagian timur, tengah dan barat. Masing masing bagian memiliki 3 jenis kuis yang bisa anda mainkan, yaitu pilihan ganda, benar-salah, dan essay.
        Progress pengerjaan soal bisa dilihat pada menu persentase selesai pada bagian menu kuis. GoodLuck!
      </Text>
      <Image
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
      />
    </View>
  );
};

export default Instruction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    alignContent: "center",
    paddingVertical: "20%",
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 5,
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  textIsi: {
    marginHorizontal: 30,
    marginVertical: 10,
    color: "white",
    textAlign: "justify",
    fontSize: 18,
    lineHeight: 25,
  },
});
