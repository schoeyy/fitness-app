import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import { fetchRecipe } from "../apis/api";

type Props = {
  route: {
    params: {
      mealId: number;
    };
  };
  navigation: any;
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

type Step = {
  number: number;
  step: string;
};

type Instructions = {
  steps: Step[];
};

type Meal = {
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  diets: string[];
  analyzedInstructions: Instructions[];
  nutrition: {
    nutrients: Nutrient[];
  };
  sourceUrl: string;
  summary: string;
};

interface MealPlanData {
  meals: Array<object>;
  nutrients: {
    calories: number;
  };
}

const RecipeDetails: React.FC<Props> = ({ route, navigation }) => {
  const [mealDetails, setMealDetails] = useState<Meal | null>(null);
  const { mealId } = route.params;

  const [changeMeal, setChangeMeal] = useState<boolean>(true);
  const [newMeal, setNewMeal] = useState<MealPlanData[]>([]);
  const [calories1, setCalories1] = useState<number>(0);

  const handlechangeMeal = () => {
    setChangeMeal((prevchangeMeal) => !prevchangeMeal);
  };

  const handlechangeMeal2 = async () => {
    await mealDataF();
  };
  

  const mealDataF = () => {
    const apiKey = '0e7bf0adcd544121ae33b2fc870de23c';
    const minCal = calories1 - 20;
    const maxCal = calories1 + 20;
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&minCalories=${minCal}&maxCalories=${maxCal}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        function getRandomInt(max) {
          return Math.floor(Math.random() * max) + 1;
        }
        let x = getRandomInt(data.results.length);

        setNewMeal(data.results[x]);
        setMealDetails(data.results[x]);

      } else {
        console.error('No meal results found');
      }
    })
    .catch((error) => {
      console.error('Error fetching meal data:', error);
    });
};

  useEffect(() => {
    fetchRecipe(mealId).then((data) => {
      setMealDetails(data.meal);
      setCalories1(Math.round(data.meal.nutrition.nutrients[0].amount));
    });
  }, [mealId]);
      


  useEffect(() => {
    fetchRecipe(mealId).then((data) => {
      setMealDetails(data.meal);
    });
  }, [mealId]);

  if (!mealDetails) return <Text>Loading...</Text>;

  const handleBack = (): void => {
    navigation.navigate("MealPlan");
  };

  if (!mealDetails) return <Text>Loading...</Text>;

  if (!mealDetails) return  calories1 = mealDetails.nutrition.nutrients[0].amount;
  
  


  return (
    <ScrollView style={styles.container}>
      {mealDetails && (
        <View>
          <View>
            <Button title="Change Meal" onPress={handlechangeMeal2} />
          </View>
          <Text style={styles.title}>{mealDetails.title}</Text>
          <Image style={styles.image} source={{ uri: mealDetails.image }} />
          <View style={styles.mealIntro}>
            <Text>Ready in: {mealDetails.readyInMinutes} minutes</Text>
            <Text>Servings: {mealDetails.servings}</Text>
            {mealDetails.nutrition.nutrients.map((nutrient, index) => (
              <Text key={index}>
                {nutrient.name}: {Math.round(nutrient.amount)} {nutrient.unit} per serving
              </Text>
            ))}
          </View>
  
          <View style={styles.mealIntro}>
            <Text style={styles.dietTitle}>Dietary Information:</Text>
            {mealDetails.diets.map((diet, index) => (
              <Text key={index}>{diet.charAt(0).toUpperCase() + diet.slice(1)}</Text>
            ))}
          </View>
  
          {mealDetails.analyzedInstructions[0].steps.map((step: Step) => (
            <View style={styles.mealIntro} key={step.number}>
              <Text style={styles.stepTitle}>Step {step.number}</Text>
              <Text>{step.step.charAt(0).toUpperCase() + step.step.slice(1)}</Text>
            </View>
          ))}
          <View style={styles.mealIntro}>
            <Text style={styles.stepTitle}>Source:</Text>
            <Text>{mealDetails.sourceUrl}</Text>
          </View>
  
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
          }
  

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 16,
    color: "#499096",
    marginLeft: 5,
  },
  mealIntro: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  dietTitle: {
    fontWeight: "bold",
  },
  stepTitle: {
    fontWeight: "bold",
    color: "#499096",
  },
  text: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#499096",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    height: 50,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#f9f3d0",
    fontWeight: "bold",
  },
});
