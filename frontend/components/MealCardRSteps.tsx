import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

const ShowRecipe = ({ meal }) => {
  const nutrtion = meal.nutrition.nutrients[0].amount;

  const ingredients2 = meal.analyzedInstructions[0].steps
    .flatMap((step) => step.ingredients)
    .map((ingredient) => ingredient.name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Description</Text>
      <Text>[{meal.title}]</Text>
      <Text>------------------------</Text>

      <View style={styles.recipeContainer}>
        <Text style={styles.recipeHeader}>------------Recipe------------</Text>

        <Text style={styles.ingredientsHeader}>Ingredients:</Text>
        <Text style={styles.ingredients}>
          {ingredients2.map((item, index) => `${item}\n\n`)}
        </Text>

        {meal.analyzedInstructions.map((item) =>
          item.steps.map((step, index) => (
            <Text style={styles.step} key={index}>
              Step: {step.number}
              {"\n"}
              {step.step}
            </Text>
          ))
        )}
      </View>

    </View>
  );
};

export default ShowRecipe;

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
  recipeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  recipeHeader: {
    fontSize: 18,
    marginBottom: 16,
  },
  ingredientsHeader: {
    fontWeight: "bold",
    textAlign: "center",
  },
  ingredients: {
    textAlign: "center",
  },
  step: {
    textAlign: "center",
    marginTop: 16,
  },
  image: {
    alignSelf: "center",
    width: 312,
    height: 231,
  },
  text: {
    textAlign: "center",
  },
});
