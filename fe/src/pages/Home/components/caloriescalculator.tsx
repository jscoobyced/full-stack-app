import { useState } from "react";
import { SelectedIngredient } from "../../../services";
import CaloriesCalculatorInput from "./caloriescalculatorinput";
import { CaloriesCalculatorOutput } from "./caloriescalculatoroutput";

export const CaloriesCalculator = () => {
  const [ingredients, setIngredients] = useState([] as SelectedIngredient[]);
  const [totalCalories, setTotalCalories] = useState(0);

  const setSelectedIngredient = (selectedIngredient: SelectedIngredient) => {
    const currentIngredients = [] as SelectedIngredient[];
    let calories = selectedIngredient.ingredient.calories;
    ingredients.forEach(ingredient => {
      currentIngredients.push(ingredient);
      calories += ingredient.ingredient.calories;
    });
    currentIngredients.push(selectedIngredient);
    setIngredients(currentIngredients);
    setTotalCalories(calories);
  };

  return (
    <>
      <span>This is the calories calculator. Add the ingredients and quantity or volume and it
    will show you the resulting number of calories per overall volume.</span>
      <section id='calculator'>
        <CaloriesCalculatorInput selectIngredient={setSelectedIngredient} />
        <CaloriesCalculatorOutput selectedIngredients={ingredients} totalCalories={totalCalories} />
      </section>
    </>
  );
};