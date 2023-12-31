import React from "react";
import logo from "../assets/vitalFit_logo.png";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

interface Props {
  navigation: any;
}

const Menu: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.menuButton}

          onPress={() => navigation.navigate("ProfilePage")}
        >
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("MealPlanPage")}
        >
          <Text style={styles.buttonText}>My Meal Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("ExercisePlan")}
        >
          <Text style={styles.buttonText}>My Exercise Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("ProgressPage")}
        >
          <Text style={styles.buttonText}>Check My Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#499096",
  },
  menuItem: {
    marginBottom: 50,
  },
  menuButton: {
    backgroundColor: "#499096",
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9f3d0",
    alignSelf: "center",
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 80,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "rgba(249, 243, 208, 0.72)",
  },
});

export default Menu;
