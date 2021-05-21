import { SelectedIngredient } from "../../../models/ingredients";

type OutputProps = {
  selectedIngredients: SelectedIngredient[];
  totalCalories: number;
  removeIngredient: (selectedIngredient: SelectedIngredient) => void,
};

export const CaloriesCalculatorOutput = (props: OutputProps) => {
  const { selectedIngredients, totalCalories, removeIngredient } = props;
  const isVisible = selectedIngredients && selectedIngredients.length > 0 ? 'show' : 'hide';

  const doRemoveIngredient = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    const id = +(event.target as HTMLSpanElement).id;
    const ingredients = selectedIngredients.filter(_ingredient => _ingredient.id === id);
    if (!!ingredients && ingredients.length === 1) {
      removeIngredient(ingredients[0]);
    }
  }

  return (
    <table className={'ingredient-calories-summary ' + isVisible}>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Quantity</th>
          <th>Calories</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {
          selectedIngredients.map((selectedIngredient, index) => {
            return <tr key={`result-ingredient-${selectedIngredient.id}-${index}`}>
              <td>{selectedIngredient.ingredient.name}</td>
              <td>{selectedIngredient.serving} {selectedIngredient.unit.symbol}</td>
              <td> {selectedIngredient.totalCalories}</td>
              <td><img
                src='delete.png'
                className='remove'
                alt='Remove'
                onClick={doRemoveIngredient}
                id={'' + selectedIngredient.id} /></td>
            </tr>;
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th></th>
          <th>{totalCalories}</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
}
