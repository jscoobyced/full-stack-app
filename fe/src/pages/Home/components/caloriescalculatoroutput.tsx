import { SelectedIngredient } from "../../../services";

type OutputProps = {
  selectedIngredients: SelectedIngredient[];
  totalCalories: number;
};

export const CaloriesCalculatorOutput = (props: OutputProps) => {
  const { selectedIngredients, totalCalories } = props;

  return (
    <ul>
      {
        selectedIngredients.map((selectedIngredient, index) => {
          return <li
            key={'result-ingredient-' + selectedIngredient.ingredient.ingredientId + '-' + index}>
            {selectedIngredient.serving} {selectedIngredient.unit.symbol} of {selectedIngredient.ingredient.name} is {selectedIngredient.totalCalories} calories.
              </li>;
        })
      }
      <li>Total calories is {totalCalories}.</li>
    </ul>
  );
}