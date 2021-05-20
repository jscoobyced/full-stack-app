import { SelectedIngredient } from "../../../../services";
import { mockIngredients, mockUnits } from "../../../../services/Ingredient/mock-data";
import { randomNumber } from "../../../../utils/crypto";

const CaloriesCalculatorInput = (props: {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void
}) => {
  const { selectIngredient } = props;

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectIngredient({
      id: randomNumber(10000),
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
