import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SIZES } from "../constants";
import { COLORS } from "../constants";

const BajuAdat = ({ navigation }) => {
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
            textAlign: "left",
            color: "white",
          }}
        >
          Berikut Sub Materi Yang Bisa Anda Simak :
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Materi", { params: "timur" })}
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
          Indonesia Timur
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Materi", { params: "tengah" })}
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
          Indonesia Tengah
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Materi", { params: "barat" })}
        style={{
          backgroundColor: COLORS.secondary,
          marginVertical: 12,
          paddingVertical: 12,
          borderRadius: 16,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Indonesia Barat</Text>
      </TouchableOpacity>

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
