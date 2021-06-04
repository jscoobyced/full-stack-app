import { useState } from "react";
import { SelectedIngredient } from "../../../models/ingredients";
import CaloriesCalculatorInput from "./caloriescalculatorinput";
import { CaloriesCalculatorOutput } from "./caloriescalculatoroutput";

export const CaloriesCalculator = () => {
  const [ingredients, setIngredients] = useState([] as SelectedIngredient[]);
  const [totalCalories, setTotalCalories] = useState(0);

  const updateIngredients = (newIngredients: SelectedIngredient[]) => {
    setIngredients(newIngredients);
    if (newIngredients.length > 1) {
      setTotalCalories(newIngredients.map(ingredient => ingredient.totalCalories).reduce((a, b) => a + b));
    } else if (newIngredients.length === 1) {
      setTotalCalories(newIngredients[0].totalCalories);
    }
  }

  const setSelectedIngredient = (selectedIngredient: SelectedIngredient) => {
    if (!!selectedIngredient) {
      updateIngredients(ingredients.concat([selectedIngredient]));
    }
  };

  const removeIngredient = (selectedIngredient: SelectedIngredient) => {
    /* istanbul ignore next */
    if (!!selectedIngredient) {
      updateIngredients(ingredients.filter(ingredient => ingredient.id !== selectedIngredient.id));
    }
  };

  return (
    <>
      <section id='calculator'>
        <span>This is the calories calculator. Add the ingredients and quantity or volume and it
    will show you the resulting number of calories per overall volume.</span>
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
