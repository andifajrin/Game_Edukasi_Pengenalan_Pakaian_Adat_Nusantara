import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView, TextInput } from "react-native";
import { COLORS, SIZES } from "../../constants";
import data from "../../data/EssayData";
import db from "../../db/config";

const Essay = ({ navigation, route }) => {
  const allQuestions = data[0][route.params?.params];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = (answer) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
    if (answer.toLowerCase() == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    // setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal

      setShowScoreModal(true);

      {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO skors_${route.params?.params} (model,value) VALUES (?,?)`,
            ["pilihan essay", score * 10],
            (txObj, resultSet) => console.log("Success", score * 10),
            (txObj, error) => console.log("Error", error)
          );
        });
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextButton(false);
      validateAnswer(answer);
      setAnswer("");
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setAnswer(0);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length - 1}</Text>
        </View>

        {/* Question */}
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
            marginBottom: -40,
          }}
        >
          <Image style={{ width: 270, height: 200 }} resizeMode={"stretch"} source={allQuestions[currentQuestionIndex]?.question} />
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
            marginBottom: -70,
          }}
        >
          <Text
            style={{
              flexDirection: "row",
              color: COLORS.white,
              fontSize: 20,
            }}
          >
            {allQuestions[currentQuestionIndex]?.soal}
          </Text>
        </View>
        <View>
          <TextInput
            style={{
              borderColor: COLORS.secondary + "40",
              backgroundColor: COLORS.secondary + "20",
              borderWidth: 3,
              height: 60,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 50,
              color: COLORS.white,
              fontSize: 20,
            }}
            label="single-line"
            mode="outlined"
            onChangeText={(__text) => setAnswer(__text)}
            value={answer}
          />

          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: -20,
              width: "100%",
              backgroundColor: COLORS.accent,
              padding: 20,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    //SafeAreaView
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: "relative",
        }}
      >
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {/* {renderOptions()} */}

        {/* Score Modal */}
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
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{score > allQuestions.length / 2 ? "Selamat!" : "Oops!"}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: -10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: COLORS.black,
                  }}
                >
                  Skor Kamu : {score * 10}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: score > allQuestions.length / 2 ? COLORS.success : COLORS.error,
                  }}
                >
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.black,
                  }}
                >
                  / {allQuestions.length - 1}
                </Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                >
                  Mulai Ulang Quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ModelQuiz", { params: route.params?.params })}
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                >
                  Selanjutnya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Background Image */}
        {/* <Image
          source={require("../../assets/images/DottedBG.png")}
          style={{
            width: SIZES.width,
            height: 140,
            zIndex: -1,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5,
          }}
          resizeMode={"contain"}
        /> */}
      </View>
    </ScrollView>
  );
};

export default Essay;
