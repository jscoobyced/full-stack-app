import { SelectedIngredient } from "../../../services";

type OutputProps = {
  selectedIngredients: SelectedIngredient[];
  totalCalories: number;
};

export const CaloriesCalculatorOutput = (props: OutputProps) => {
  const { selectedIngredients, totalCalories } = props;
  const isVisible = selectedIngredients && selectedIngredients.length > 0 ? 'show' : 'hide';

  return (
    <table className={'ingredient-calories-summary ' + isVisible}>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Quantity</th>
          <th>Calories</th>
        </tr>
      </thead>
      <tbody>
        {
          selectedIngredients.map((selectedIngredient, index) => {
            return <tr key={'result-ingredient-' + selectedIngredient.ingredient.ingredientId + '-' + index}>
              <td>{selectedIngredient.ingredient.name}</td>
              <td>{selectedIngredient.serving} {selectedIngredient.unit.symbol}</td>
              <td> {selectedIngredient.totalCalories}</td>
            </tr>;
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th></th>
          <th>{totalCalories}</th>
        </tr>
      </tfoot>
    </table>
  );
}