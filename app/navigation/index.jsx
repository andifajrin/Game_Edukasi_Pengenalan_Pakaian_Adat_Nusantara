import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

import MateriMenu from "../screens/MateriMenu";
import About from "../screens/About";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../constants";
import Materi from "../screens/materi/Materi";
import Instruction from "../screens/Instruction";
import MenuQuiz from "../screens/GameMenu/MenuQuiz";
import ModelQuiz from "../screens/GameMenu/ModelQuiz";
import TebakGambar from "../screens/Game/TebakGambar";
import Essay from "../screens/Game/Essay";
import Quiz from "../screens/Game/Quiz";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNav} options={{ headerShown: false }} />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({
          title: `Indonesia Bag. ${route.params.params.charAt(0).toUpperCase() + route.params.params.slice(1)}`,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="MateriMenu"
        component={MateriMenu}
        options={{
          title: "Menu Materi",
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Materi"
        component={Materi}
        options={({ route }) => ({
          title: `Materi Indonesia Bag. ${route.params.params.charAt(0).toUpperCase() + route.params.params.slice(1)}`,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Instruction"
        component={Instruction}
        options={{
          title: "Petunjuk",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="MenuQuiz"
        component={MenuQuiz}
        options={{
          title: "Menu Quiz",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="TebakGambar"
        component={TebakGambar}
        options={({ route }) => ({
          title: `Indonesia Bag. ${route.params.params.charAt(0).toUpperCase() + route.params.params.slice(1)}`,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="ModelQuiz"
        component={ModelQuiz}
        options={({ route }) => ({
          title: `Quiz Indonesia Bag. ${route.params.params.charAt(0).toUpperCase() + route.params.params.slice(1)}`,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Essay"
        component={Essay}
        options={({ route }) => ({
          title: `Indonesia Bag. ${route.params.params.charAt(0).toUpperCase() + route.params.params.slice(1)}`,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      {/* <Stack.Screen
        name="InputNama"
        component={InputNama}
        options={{
          title: "tes",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="MenuQuiz"
        component={MenuQuiz}
        options={{
          title: "Essay",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      /> */}
    </Stack.Navigator>
  );
}
export default MyStack;

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={COLORS.primary} size={size + 5} />,
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Materi"
        component={MateriMenu}
        options={{
          tabBarLabel: "Instruction",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="newspaper-variant-multiple" color={COLORS.primary} size={size} />,
          // tabBarBadge: 3,
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={COLORS.primary} size={size} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
