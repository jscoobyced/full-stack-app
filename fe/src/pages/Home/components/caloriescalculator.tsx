import { useState } from "react";
import { SelectedIngredient } from "../../../services";
import { calculateAllCalories } from "../../../services/Calories";
import CaloriesCalculatorInput from "./caloriescalculatorinput";
import { CaloriesCalculatorOutput } from "./caloriescalculatoroutput";

export const CaloriesCalculator = () => {
  const [ingredients, setIngredients] = useState([] as SelectedIngredient[]);
  const [totalCalories, setTotalCalories] = useState(0);

  const setSelectedIngredient = (selectedIngredient: SelectedIngredient) => {
    const newIngredients = ingredients.concat([selectedIngredient]);
    setIngredients(newIngredients);
    setTotalCalories(calculateAllCalories(newIngredients));
  };

  const removeIngredient = (selectedIngredient: SelectedIngredient) => {
    const newIngredients = ingredients.filter(ingredient => ingredient.id !== selectedIngredient.id);
    setIngredients(newIngredients);
    setTotalCalories(calculateAllCalories(newIngredients));
  };

  return (
    <>
      <span>This is the calories calculator. Add the ingredients and quantity or volume and it
    will show you the resulting number of calories per overall volume.</span>
      <section id='calculator'>
        <CaloriesCalculatorInput selectIngredient={setSelectedIngredient} />
        <CaloriesCalculatorOutput
          selectedIngredients={ingredients}
          totalCalories={totalCalories}
          removeIngredient={removeIngredient}
        />
      </section>
    </>
  );
};
