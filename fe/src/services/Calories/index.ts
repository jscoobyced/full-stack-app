import { SelectedIngredient } from "../../models/ingredients";

export const calculateCalories = (selectedIngredient: SelectedIngredient): number => {
  if (!selectedIngredient) {
    return 0;
  }
  const { ingredient, unit, serving: quantity } = selectedIngredient;
  let multiplier = 0;
  if (!ingredient.baseCalorie || !ingredient.baseCalorie.unit || quantity === 0) {
    return 0;
  }

  if (ingredient.baseCalorie.unit.id === unit.id) {
    multiplier = 1;
  } else {
    const conversionUnits = ingredient.conversions?.filter(conversion => conversion.fromUnit === unit);
    if (!!conversionUnits && conversionUnits.length === 1) {
      multiplier = conversionUnits[0].multiplier;
    }
  }
  return Math.round(multiplier * ingredient.baseCalorie.calories * quantity / ingredient.baseCalorie.serving);
}

export const calculateAllCalories = (selectedIngredients: SelectedIngredient[]): number => {
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return 0;
  }
  let totalCalories = 0;
  selectedIngredients.forEach(selectedIngredient => {
    totalCalories += calculateCalories(selectedIngredient);
  });
  return totalCalories;
}
