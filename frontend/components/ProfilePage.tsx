import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Button,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import calculateCalorieIntake from "./CalorieCalculation";

interface UserData {
  [key: string]: any;
  calorieIntake?: number;
}

interface Preferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutFree: boolean;
  dairyFree: boolean;
  shellfish: boolean;
}

interface Props {
  navigation: any;
}

const ProfilePage: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [preferences, setPreferences] = useState<Preferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
    dairyFree: false,
    shellfish: false,
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");
  const [calorieIntake, setCalorieIntake] = useState<number>(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const storedData = await SecureStore.getItemAsync("userProfile");

    if (storedData) {
      const storedUserData = JSON.parse(storedData);
      const calculatedCalorieIntake = calculateCalorieIntake(storedUserData);
      if (calculatedCalorieIntake !== storedUserData.calorieIntake) {
        storedUserData.calorieIntake = calculatedCalorieIntake;
        await SecureStore.setItemAsync(
          "userProfile",
          JSON.stringify(storedUserData)
        );
      }
      setUserData(storedUserData);
      setCalorieIntake(calculatedCalorieIntake);
      setPreferences(storedUserData.preferences);
    }
  };

  const updateUserData = async (key: string, value: any) => {
    const updatedUserData: UserData = {
      ...userData,
      [key]: value,
    };

    if (
      key === "weight" ||
      key === "height" ||
      key === "activityLevel" ||
      key === "age" ||
      key === "gender"
    ) {
      updatedUserData.calorieIntake = calculateCalorieIntake(updatedUserData);
      setCalorieIntake(updatedUserData.calorieIntake);
    }

    await SecureStore.setItemAsync(
      "userProfile",
      JSON.stringify(updatedUserData)
    );
    setUserData(updatedUserData);
  };

  const toggleSwitch = (preference: keyof Preferences) => {
    const updatedPreferences: Preferences = {
      ...preferences,
      [preference]: !preferences[preference],
    };
    updateUserData("preferences", updatedPreferences);
    setPreferences(updatedPreferences);
  };

  const clearUserData = async () => {
    Alert.alert(
      "Clear User Data",
      "Are you sure you want to clear all user data?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await SecureStore.deleteItemAsync("userProfile");
            setUserData({});
            setPreferences({
              vegetarian: false,
              vegan: false,
              glutenFree: false,
              nutFree: false,
              dairyFree: false,
              shellfish: false,
            });
            navigation.navigate("CreateProfileForm");
          },
        },
      ]
    );
  };

  const weightRange = Array.from({ length: 251 }, (_, i) => i + 50);
  const heightRange = Array.from({ length: 181 }, (_, i) => i + 120);

  const renderUpdateButton = (field: string) => {
    if (editingField === field) {
      return (
        <Button
          title="Update"
          onPress={() => {
            updateUserData(field, fieldValue);
            setEditingField(null);
          }}
        />
      );
    }
    return null;
  };

  const handleBack = (): void => {
    navigation.navigate("Menu");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.caloriesBox}>
            <Text style={styles.caloriesText}>
              My recommended daily calories:
            </Text>
            <Text style={styles.caloriesNum}>{calorieIntake}</Text>
          </View>
          <Text style={styles.subheading}>Age: {userData.age}</Text>

          <Text style={styles.subheading}>Weight (kg): {userData.weight}</Text>
          {!editingField && (
            <Button
              title="Update weight"
              color="#e05353"
              onPress={() => {
                setEditingField("weight");
                setFieldValue(userData.weight || "50");
              }}
            />
          )}
          {editingField === "weight" && (
            <View>
              <Picker
                selectedValue={fieldValue}
                onValueChange={(value) => setFieldValue(value)}
              >
                {weightRange.map((value) => (
                  <Picker.Item
                    key={value}
                    label={value.toString()}
                    value={value.toString()}
                  />
                ))}
              </Picker>
              {renderUpdateButton("weight")}
            </View>
          )}

          <Text style={styles.subheading}>Height (cm): {userData.height}</Text>
          {!editingField && (
            <Button
              title="Update height"
              color="#e05353"
              onPress={() => {
                setEditingField("height");
                setFieldValue(userData.height || "120");
              }}
            />
          )}
          {editingField === "height" && (
            <View>
              <Picker
                selectedValue={fieldValue}
                onValueChange={(value) => setFieldValue(value)}
              >
                {heightRange.map((value) => (
                  <Picker.Item
                    key={value}
                    label={value.toString()}
                    value={value.toString()}
                  />
                ))}
              </Picker>
              {renderUpdateButton("height")}
            </View>
          )}

          <Text style={styles.subheading}>Gender: {userData.gender}</Text>

          <Text style={styles.subheading}>
            Activity Level: {userData.activityLevel}
          </Text>
          {!editingField && (
            <Button
              title="Update activity level"
              color="#e05353"
              onPress={() => {
                setEditingField("activityLevel");
                setFieldValue(userData.activityLevel || "Low");
              }}
            />
          )}
          {editingField === "activityLevel" && (
            <View>
              <Picker
                selectedValue={fieldValue}
                onValueChange={(value) => setFieldValue(value)}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Moderate" value="Moderate" />
                <Picker.Item label="Intense" value="Intense" />
              </Picker>
              {renderUpdateButton("activityLevel")}
            </View>
          )}

          <Text style={styles.subheading}>Goal: {userData.goal}</Text>
          {!editingField && (
            <Button
              title="Update goal"
              color="#e05353"
              onPress={() => {
                setEditingField("goal");
                setFieldValue(userData.goal || "Weight Loss");
              }}
            />
          )}
          {editingField === "goal" && (
            <View>
              <Picker
                selectedValue={fieldValue}
                onValueChange={(value) => setFieldValue(value)}
              >
                <Picker.Item label="Weight Loss" value="Weight Loss" />
                <Picker.Item label="Bulk Up" value="Bulk Up" />
              </Picker>
              {renderUpdateButton("goal")}
            </View>
          )}
          <View style={styles.grid}>
            <View style={styles.gridRow}>
              <Text style={styles.dietLabel}>Vegetarian</Text>
              <Switch
                onValueChange={() => toggleSwitch("vegetarian")}
                value={preferences.vegetarian}
                ios_backgroundColor="#f9f3d0"
                thumbColor="#fcfbf5"
                trackColor={{ true: "#499096" }}
              />
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.dietLabel}>Vegan</Text>
              <Switch
                onValueChange={() => toggleSwitch("vegan")}
                value={preferences.vegan}
                ios_backgroundColor="#f9f3d0"
                thumbColor="#fcfbf5"
                trackColor={{ true: "#499096" }}
              />
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.dietLabel}>Gluten Free</Text>
              <Switch
                onValueChange={() => toggleSwitch("glutenFree")}
                value={preferences.glutenFree}
                ios_backgroundColor="#f9f3d0"
                thumbColor="#fcfbf5"
                trackColor={{ true: "#499096" }}
              />
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridRow}>
              <Text style={styles.dietLabel}>Nut Free</Text>
              <Switch
                onValueChange={() => toggleSwitch("nutFree")}
                value={preferences.nutFree}
                ios_backgroundColor="#f9f3d0"
                thumbColor="#fcfbf5"
                trackColor={{ true: "#499096" }}
              />
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.dietLabel}>Dairy Free</Text>
              <Switch
                onValueChange={() => toggleSwitch("dairyFree")}
                value={preferences.dairyFree}
                ios_backgroundColor="#f9f3d0"
                thumbColor="#fcfbf5"
                trackColor={{ true: "#499096" }}
              />
            </View>
            <View style={styles.gridRow}>
              <Text style={styles.dietLabel}>Shellfish Free</Text>
              <Switch
                onValueChange={() => toggleSwitch("shellfish")}
                value={preferences.shellfish}
                ios_backgroundColor="#f9f3d0"
                thumbColor="#fcfbf5"
                trackColor={{ true: "#499096" }}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={clearUserData}>
            <Text style={styles.clearText}>Clear my data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  caloriesBox: {
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  caloriesText: {
    color: "#499096",
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    textAlign: "center",
  },
  caloriesNum: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 5,
    color: "#499096",
    paddingRight: 15,
    paddingLeft: 15,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#499096",
    marginLeft: 5,
  },
  dietLabel: {
    color: "#499096",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#499096",
    width: 300,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9f3d0",
    alignSelf: "center",
    padding: 10,
  },
  clearText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#e05353",
    alignSelf: "center",
    width: 300,
    height: 50,
    padding: 10,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 10,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  gridRow: {
    width: "30%",
    alignItems: "center",
  },
});

export default ProfilePage;
