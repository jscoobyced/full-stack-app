import { useContext, useEffect, useState } from 'react';
import { Calorie, Ingredient, Recipe, SelectedIngredient, Unit } from '../../models/ingredients';
import { User } from '../../models/user';
import { ServiceContext } from '../../services/Context';
import { getUniqueCategories } from '../../utils/category';
import { sortIngredients } from '../../utils/ingredients';
import './caloriescalculator.css';

type InputProps = {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void,
  canSave: boolean,
  saveIngredients: (recipeName: string) => void,
  user: User,
  replaceSelectedIngredients: (selectedIngredients: SelectedIngredient[]) => void,
};

const CaloriesCalculatorInput = (props: InputProps) => {

  const { selectIngredient, canSave, saveIngredients, user, replaceSelectedIngredients } = props;

  const [ingredientData, setIngredientData] = useState([] as JSX.Element[]);
  const [ingredientList, setIngredientList] = useState([] as Ingredient[]);
  const [calorieList, setCalorieList] = useState([] as Calorie[]);
  const [ingredient, setIngredient] = useState({} as Ingredient);
  const [unitList, setUnitList] = useState([] as Unit[]);
  const [unit, setUnit] = useState({} as Unit);
  const [unitData, setUnitData] = useState([] as JSX.Element[]);
  const [quantity, setQuantity] = useState(1);
  const [counter, setCounter] = useState(0);
  const [recipeName, setRecipeName] = useState('');
  const [recipeList, setRecipeList] = useState([] as JSX.Element[]);
  const [recipes, setRecipes] = useState([] as Recipe[]);

  const { ingredientService, recipeService } = useContext(ServiceContext);

  useEffect(() => {
    ingredientService.getIngredients().then(response => {
      setIngredientList(response.ingredients);
      setCalorieList(response.calories);
      setIngredientData(buildIngredientList(response.ingredients));
    });
    if (!!user && !!user.referenceId) {
      recipeService.getRecipes(user.referenceId).then(response => {
        const _recipes = response.data as Recipe[];
        setRecipes(_recipes);
        const _recipeList = buildSavedRecipeList(_recipes);
        if (!!_recipeList) {
          setRecipeList(_recipeList);
        }
      });
    }
  }, [ingredientService, user, recipeService]);

  const buildIngredientList = (ingredients: Ingredient[]) => {
    const ingredientCategories = getUniqueCategories(ingredients);
    return ingredientCategories.map(category => {
      return <optgroup key={'ingredient-category-' + category.id}
        label={category.name}>
        {
          ingredients.filter(_ingredient => {
            return _ingredient.category.id === category.id
          }).sort(sortIngredients)
            .map(_ingredient => {
              return <option value={_ingredient.id}
                key={'ingredient-' + _ingredient.id}>{_ingredient.name}</option>
            })
        }
      </optgroup>
    });
  };

  const buildUnitList = (units: Unit[]) => {
    const unitCategories = getUniqueCategories(units);
    return unitCategories.map(category => {
      return <optgroup key={'unit-category-' + category.id}
        label={category.name}>
        {
          units.filter(_unit => {
            return _unit.category.id === category.id
          }).map(_unit => {
            return <option value={_unit.id}
              key={'unit-' + _unit.id}>{_unit.name} ({_unit.symbol})</option>
          })
        }
      </optgroup>
    });
  };

  const buildSavedRecipeList = (savedRecipes: Recipe[]) => {
    if (!savedRecipes || savedRecipes.length === 0) {
      return undefined;
    }
    return savedRecipes.map(recipe => {
      return (<option key={'recipe-' + recipe.id} value={recipe.id}>{recipe.name}</option>);
    })
  }

  const onSelectIngredient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const selectedIngredient = ingredientList.find(_ingredient => _ingredient.id === selectedOption);
    if (selectedIngredient) {
      setIngredient(selectedIngredient)
      const units = calorieList
        .filter(calorie => calorie.ingredientId === selectedIngredient.id)
        .flatMap(calorie => calorie.unit)
        .sort((unit1: Unit, unit2: Unit) => unit1.name.localeCompare(unit2.name));
      setUnitList(units);
      setUnitData(buildUnitList(units));
    }
  }

  const onSelectUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const selectedUnit = unitList.find(_unit => _unit.id === selectedOption);
    setUnit(selectedUnit as Unit);
  }

  const onSelectQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    setQuantity(selectedOption);
  }

  const onSelectRecipe = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const myRecipe = recipes.find(recipe => recipe.id === selectedOption);
    if (!!myRecipe) {
      replaceSelectedIngredients(myRecipe.ingredients);
    }
  }

  const onInputRecipeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const _recipeName = event.target.value;
    setRecipeName(_recipeName);
  }

  const addIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const calorie = calorieList
      .find(_calorie => _calorie.ingredientId === ingredient.id && _calorie.unit.id === unit.id);
    /* istanbul ignore next */
    if (!!calorie) {
      const selectedIngredient: SelectedIngredient = {
        id: counter,
        ingredient,
        calorie,
        serving: quantity,
        totalCalories: Math.round(calorie.calories * quantity / calorie.serving)
      };
      setCounter(counter + 1);
      selectIngredient(selectedIngredient);
    }
  }

  const saveReceipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveIngredients(recipeName);
  }

  const save = canSave ? (<button
    className='button-save'
    disabled={!recipeName || recipeName.length < 1}
    onClick={saveReceipe}>Save</button>) : (<></>);

  const recipeNameComponent = canSave ? (<input id='quantity'
    aria-label='recipe-name'
    onChange={onInputRecipeName}
    className='input-recipe-name'
    value={recipeName}></input>) : (<></>);

  return (
    <>
      <div className='select-ingredient'>
        <div className='select-ingredient-part'>
          <label htmlFor='ingredient'>Ingredient</label>
          <select id='ingredient' onChange={onSelectIngredient}>
            <option value='-1'>-- Select --</option>
            {ingredientData}
          </select>
          <label htmlFor='unit'>Unit</label>
          <select id='unit' onChange={onSelectUnit} disabled={unitData.length === 0}>
            <option value='-1'>-- Select --</option>
            {unitData}
          </select>
        </div>
        <div className='select-ingredient-part'>
          <label htmlFor='quantity'>Quantity</label>
          <input id='quantity'
            aria-label='quantity'
            onChange={onSelectQuantity}
            className='input-quantity'
            step={0.1} size={5} value={quantity}></input>
          <div className='buttons'>
            <button className='button-add'
              disabled={!unit || !unit.id || quantity <= 0}
              onClick={addIngredient}>Add</button>
            {save}
          </div>
          {recipeNameComponent}
        </div>
      </div>
      <div className='select-recipe'>
        <label htmlFor='recipes'>Saved recipes</label>
        <select id='recipes' onChange={onSelectRecipe} disabled={recipeList.length === 0}>
          <option value='-1'>-- Select --</option>
          {recipeList}
        </select>
      </div>
    </>);
}

export default CaloriesCalculatorInput;
