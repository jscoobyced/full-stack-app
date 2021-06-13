import { useContext, useEffect, useState } from "react";
import { SelectedIngredient } from "../../models/ingredients";
import { SecureUser } from "../../models/user";
import { isAllowedToSaveRecipe } from "../../services/Authorization";
import { ServiceContext } from "../../services/Context";
import { LanguageContent } from "../../services/i18n/language";
import CaloriesCalculatorInput from "./caloriescalculatorinput";
import { CaloriesCalculatorOutput } from "./caloriescalculatoroutput";

interface CalorieCalculatorProps {
  user: SecureUser;
  translations: LanguageContent;
}

export const CaloriesCalculator = (props: CalorieCalculatorProps) => {
  const { user, translations } = props;
  const [ingredients, setIngredients] = useState([] as SelectedIngredient[]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [canSave, setCanSave] = useState(false);
  const { recipeService } = useContext(ServiceContext);
  const [saveStatus, setSaveStatus] = useState(0);
  const [savingMessage, setSavingMessage] = useState('');

  const updateIngredients = (newIngredients: SelectedIngredient[]) => {
    setIngredients(newIngredients);
    setCanSave(newIngredients.length > 0 && isAllowedToSaveRecipe(user));
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

  const saveSelectedIngredients = async (recipeName: string) => {
    if (!isAllowedToSaveRecipe(user)) {
      setSaveStatus(4);
      return;
    }
    setSaveStatus(1);
    const uid = user.user.referenceId + '';
    const recipe = {
      id: 0,
      name: recipeName,
      ingredients,
      uid,
    };
    recipeService.saveRecipe(recipe).then(result => {
      if (result && result.data) {
        setSaveStatus(2);
      } else if (result && !!result.error?.message) {
        setSavingMessage(result.error?.message);
      } else {
        setSaveStatus(3);
      }
    });
  };

  const replaceSelectedIngredients = (newSelectedIngredients: SelectedIngredient[]) => {
    updateIngredients(newSelectedIngredients);
  }

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
      case 4:
        setSavingMessage('You are not allowed to save the recipe.');
        break;
      default:
        /* istanbul ignore next */
        break;
    }

  }, [saveStatus]);

  return (
    <>
      <section id='calculator'>
        <span>{translations.CaloriesCalculatorIntro}</span>
        <CaloriesCalculatorInput
          selectIngredient={setSelectedIngredient}
          canSave={canSave}
          saveIngredients={saveSelectedIngredients}
          user={user?.user}
          replaceSelectedIngredients={replaceSelectedIngredients} />
        <div>{savingMessage}</div>
        <CaloriesCalculatorOutput
          selectedIngredients={ingredients}
          totalCalories={totalCalories}
          removeIngredient={removeIngredient}
          translations={translations}
        />
      </section>
    </>
  );
};
