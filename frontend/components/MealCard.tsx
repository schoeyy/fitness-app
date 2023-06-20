import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { fetchMealPlan, fetchRecipe} from "../apis/api";
import ShowRecipe from './MealCardRSteps'


interface MealPlanData {
  meals: Array<object>;
  nutrients: {
    calories: number;
  };
}

const MealPlan: React.FC = ({navigation}) => {
  const [meal, setMeal] = useState<MealPlanData[]>([]);
  const [planCalories, setPlanCalories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  let id = 660015;



  
  useEffect(() => {
    fetchRecipe(id).then((data) => {
     // console.log("RECIPESSSSSSSSSSSSSSSS:", data.meal);
      //console.log("RECIPESSSSSSSSSSSSSSSS:", data.meal.summary);
      //console.log("RECIPESSSSSSSSSSSSSSSS:", data.meal.analyzedInstructions[0].steps[0].step);
      //console.log("Nutrition:", data.meal.nutrition.nutrients[0].amount);
      //console.log("Steppppppppppppppppppppppppppp:", data.meal.analyzedInstructions);

      const nutrtion = data.meal.nutrition.nutrients[0].amount;


    setMeal(data.meal)
    setPlanCalories(nutrtion)
    //console.log("State Settttttttttt", meal);

      setIsLoading(false);
    });
}, [id]);

console.log(meal)  // return a different plan (change state) if user swipes "don't fancy this one". The particular data for that plan needs inputting below.


  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ShowRecipe meal={meal}/>
     
    </View>
  );
};

export default MealPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
  },
});

/*  <Text style={styles.title}>Meal Description</Text>
      <Text>Meal</Text>
      <Text>[insert image of breakfast item]</Text>
      <Text>[{meal.title}]</Text>
      <Text>------------------------</Text>
    
      <Text>TOTAL CALORIES: {planCalories}</Text>
      <Text>------------------------</Text>
      <Text>------------------------</Text>
      <Text>Looks tasty? 😋 Click to save ❤️</Text>
      <Text>------------------------</Text>
      <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
        Don't fancy this one?{"\n"}
        Swipe to choose a different meal plan{"\n"}
        {'<<<<<'}
      </Text>
      <Text>
  dishTypes:
  {meal.dishTypes.map((type, index) => (
    <Text key={index}> {type},</Text>
  ))}
</Text>

      <Text>diets: {meal.diets}</Text>
      <Text>readyInMinutes: {meal.readyInMinutes}</Text>


      <Text>
  Recipe:
  {meal.analyzedInstructions.map((item) => (
    item.steps.map((step, index) => (
      <Text key={index}>
          <Text>{"\n"}</Text>
        <Text>Step: {step.number}</Text>
        <Text>{"\n"}</Text>
        <Text>{step.step}</Text>
        <Text>{"\n\n"}</Text>
        <Text>Ingredients: {step.ingredients.map((item, index) => (
          <Text>
                      <Text>{"\n"}</Text>
                      <Text key={index}>{item.name}</Text>

            </Text>
          ))}</Text>
        <Text>{"\n"}</Text>
      </Text>
    ))
  ))}
</Text>



<Text>Step: {meal.analyzedInstructions[0].steps[0].step}</Text>





      <View>
        <Button
          title="ShowRecipe"
          onPress={() => navigation.navigate("ShowRecipe")}
        />
      </View>
*/