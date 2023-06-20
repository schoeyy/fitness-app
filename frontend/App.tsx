import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomePage from "./components/WelcomePage";
import CreateProfileForm from "./components/CreateProfileForm";
import ProfilePage from "./components/ProfilePage";
import MealPlanPage from "./components/MealPlanPage";
import Menu from "./components/Menu";
import ProgressPage from "./components/ProgressPage";
import ExercisePlan from "./components/ExercisePlan";
import MealCard from './components/MealCard'
import ShowRecipe from './components/MealCardRSteps'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="CreateProfileForm" component={CreateProfileForm} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="MealPlanPage" component={MealPlanPage} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="ExercisePlan" component={ExercisePlan} />
        <Stack.Screen name="ProgressPage" component={ProgressPage} />
        <Stack.Screen name="MealCard" component={MealCard} />
        <Stack.Screen name="ShowRecipe" component={ShowRecipe} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

