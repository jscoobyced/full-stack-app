import { SelectedIngredient } from "../../../../services";
import { mockIngredients, mockUnits } from "../../../../services/Ingredient/mock-data";

const CaloriesCalculatorInput = (props: {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void
}) => {
  const { selectIngredient } = props;

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectIngredient({
      id: Math.round(new Date().getTime() % 10000),
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      serving: 0,
      totalCalories: 0,
    });
  }

  return (
    <button onClick={onButtonClick} />
  );
}

export default CaloriesCalculatorInput;
