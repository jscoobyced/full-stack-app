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
        selectedIngredients.map((ingredient, index) => {
          return <li
            key={'result-ingredient-' + ingredient.ingredient.ingredientId + '-' + index}>
            {ingredient.quantity} {ingredient.unit.symbol} of {ingredient.ingredient.name} is {ingredient.ingredient.calories} calories.
              </li>;
        })
      }
      <li>Total calories is {totalCalories}.</li>
    </ul>
  );
}