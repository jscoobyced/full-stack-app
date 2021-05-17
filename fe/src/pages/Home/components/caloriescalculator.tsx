import { SelectedIngredient } from "../../../services";
import CaloriesCalculatorInput from "./caloriescalculatorinput";

export const CaloriesCalculator = () => {
  const setSelectedIngredient = (selectedIngredient: SelectedIngredient) => {
  };

  return (
    <>
      <span>This is the calories calculator. Add the ingredients and quantity or volume and it
    will show you the resulting number of calories per overall volume.</span>
      <CaloriesCalculatorInput selectIngredient={setSelectedIngredient} />
    </>
  );
};