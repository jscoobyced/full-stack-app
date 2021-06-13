import { SelectedIngredient } from "../../models/ingredients";
import { LanguageContent } from "../../services/i18n/language";

type OutputProps = {
  selectedIngredients: SelectedIngredient[];
  totalCalories: number;
  removeIngredient: (selectedIngredient: SelectedIngredient) => void,
  translations: LanguageContent,
};

export const CaloriesCalculatorOutput = (props: OutputProps) => {
  const { selectedIngredients, totalCalories, removeIngredient, translations } = props;
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
          <th>{translations.Ingredient}</th>
          <th>{translations.Quantity}</th>
          <th>{translations.Calories}</th>
          <th>{translations.Remove}</th>
        </tr>
      </thead>
      <tbody>
        {
          selectedIngredients.map((selectedIngredient, index) => {
            return <tr key={`result-ingredient-${selectedIngredient.id}-${index}`}>
              <td>{selectedIngredient.ingredient.name}</td>
              <td>{selectedIngredient.serving} {selectedIngredient.calorie.unit.symbol}</td>
              <td> {selectedIngredient.totalCalories}</td>
              <td><img
                src='delete.png'
                className='remove'
                alt={translations.Remove}
                onClick={doRemoveIngredient}
                id={'' + selectedIngredient.id} /></td>
            </tr>;
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <th>{translations.Total}</th>
          <th></th>
          <th>{totalCalories}</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
}
