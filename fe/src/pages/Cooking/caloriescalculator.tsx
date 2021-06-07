import { useContext, useEffect, useState } from "react";
import { SelectedIngredient } from "../../models/ingredients";
import { ServiceContext } from "../../services/Context";
import CaloriesCalculatorInput from "./caloriescalculatorinput";
import { CaloriesCalculatorOutput } from "./caloriescalculatoroutput";

export const CaloriesCalculator = () => {
  const [ingredients, setIngredients] = useState([] as SelectedIngredient[]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [canSave, setCanSave] = useState(false);
  const { ingredientService } = useContext(ServiceContext);
  const [saveStatus, setSaveStatus] = useState(0);
  const [savingMessage, setSavingMessage] = useState('');

  const updateIngredients = (newIngredients: SelectedIngredient[]) => {
    setIngredients(newIngredients);
    setCanSave(newIngredients.length > 0);
    if (newIngredients.length > 1) {
      setTotalCalories(newIngredients.map(ingredient => ingredient.totalCalories).reduce((a, b) => a + b));
    } else if (newIngredients.length === 1) {
      setTotalCalories(newIngredients[0].totalCalories);
    }
  }

  const setSelectedIngredient = (selectedIngredient: SelectedIngredient) => {
    setSaveStatus(0);
    if (!!selectedIngredient) {
      updateIngredients(ingredients.concat([selectedIngredient]));
    }
  };

  const removeIngredient = (selectedIngredient: SelectedIngredient) => {
    setSaveStatus(0);
    /* istanbul ignore next */
    if (!!selectedIngredient) {
      updateIngredients(ingredients.filter(ingredient => ingredient.id !== selectedIngredient.id));
    }
  };

  const saveSelectedIngredients = async () => {
    setSaveStatus(1);
    ingredientService.saveSelectedIngredients(ingredients).then(result => {
      if (result) {
        setSaveStatus(2);
      } else {
        setSaveStatus(3);
      }
    });
  };

  useEffect(() => {
    /* istanbul ignore next */
    switch (saveStatus) {
      case 0:
        setSavingMessage('');
        break;
      case 1:
        setSavingMessage('Saving...');
        break;
      case 2:
        setSavingMessage('Saved successfully.');
        break;
      case 3:
        setSavingMessage('Saving failed.');
        break;
      default:
        /* istanbul ignore next */
        break;
    }

  }, [saveStatus]);

  return (
    <>
      <section id='calculator'>
        <span>This is the calories calculator. Add the ingredients and quantity or volume and it
    will show you the resulting number of calories per overall volume.</span>
        <CaloriesCalculatorInput
          selectIngredient={setSelectedIngredient}
          canSave={canSave}
          saveIngredients={saveSelectedIngredients} />
        <div>{savingMessage}</div>
        <CaloriesCalculatorOutput
          selectedIngredients={ingredients}
          totalCalories={totalCalories}
          removeIngredient={removeIngredient}
        />
      </section>
    </>
  );
};
