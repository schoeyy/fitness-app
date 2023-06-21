import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { fetchRecipe} from "../apis/api";
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
  const [showRecip, setShowRecip] = useState<boolean>(false);

  const handleShowRecipe = () => {
    setShowRecip((prevshowRecip) => !prevshowRecip);
  };



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
      <Text style={styles.title}>Meal Description</Text>
      <Text>Meal</Text>
      <Text>
         <Image
        source={{ uri: meal.image }}
        style={styles.image}
      /></Text>
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


      <Text></Text>
     

      <View>
        <Button
          title="ShowRecipe"
          onPress={handleShowRecipe}
        />
      </View>
      <View>
    {showRecip ? <ShowRecipe meal={meal}/> : null}
    {showRecip ? <View>
        <Button
          title="ShowRecipe"
          onPress={handleShowRecipe}
        />
      </View> : null}

    </View>


     
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
  image: {
    alignSelf: "center",
    width: 312,
    height: 231,
  }
});

