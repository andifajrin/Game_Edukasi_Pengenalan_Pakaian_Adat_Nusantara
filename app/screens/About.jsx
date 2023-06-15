import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import { COLORS } from "../constants";
import data from "../data/QuizData";

const BajuAdat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Kami</Text>
      <Text style={styles.textIsi}>
        CultureZone adalah aplikasi yang tercipta dari penyatuan 2 buah isi kepala mahasiswa Universitas Dipa Makassar yang sedang menyusun tugas akhir, mereka adalah Andi Fajrin Haris & Muhammad Nandar Cakra Wirya. Aplikasi ini merupakan
        aplikasi yang memiliki konsep game edukasi pengenalan baju adat nusantara yang harapannya dapat memperkenalkan kembali budaya indonesia di kalangan anak muda yang dimana saat ini budaya kita mulai terkikis oleh budaya barat.
        CulturZone dibuat dengan menggunakan metode MDLC yang dimana metode ini merupakan salah satu tahapan dalam pengembangan sebuah aplikasi yang memadukan konsep seni dalam bentuk multimedia kedalam program aplikasi.
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

export default BajuAdat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 12,
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  textIsi: {
    marginHorizontal: 30,
    marginVertical: 12,
    color: "white",
    textAlign: "justify",
    fontSize: 18,
    lineHeight: 25,
  },
});
