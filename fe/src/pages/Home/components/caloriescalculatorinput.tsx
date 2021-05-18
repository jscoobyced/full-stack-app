import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Ingredient, SelectedIngredient, Unit } from '../../../services';
import { calculateCalories } from '../../../services/Calories';
import { ServiceContext } from '../../../services/Context';
import './caloriescalculator.css';

type InputProps = {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void,
};

const CaloriesCalculatorInput = (props: InputProps) => {

  const { selectIngredient } = props;

  const [ingredientData, setIngredientData] = useState([] as JSX.Element[]);
  const [ingredientList, setIngredientList] = useState([] as Ingredient[]);
  const [ingredient, setIngredient] = useState({} as Ingredient);
  const [unitList, setUnitList] = useState([] as Unit[]);
  const [unit, setUnit] = useState({} as Unit);
  const [unitData, setUnitData] = useState([] as JSX.Element[]);
  const [quantity, setQuantity] = useState(0);

  const { configuration } = useContext(ServiceContext);

  useEffect(() => {
    configuration.getConfiguration().then(ingredients => {
      setIngredientList(ingredients);
      setIngredientData(buildIngredientList(ingredients));
    });
  }, [configuration]);

  const buildIngredientList = (ingredients: Ingredient[]) => {
    const rawIngredientCategories = ingredients.flatMap(ingredient => ingredient.category);
    const ingredientCategories = Array.from(new Set(rawIngredientCategories));
    return ingredientCategories.map(category => {
      return <optgroup key={'ingredient-category-' + category.categoryId}
        label={category.name}>
        {
          ingredients.filter(ingredient => {
            return ingredient.category.categoryId === category.categoryId
          }).map(ingredient => {
            return <option value={ingredient.ingredientId}
              key={'ingredient-' + ingredient.ingredientId}>{ingredient.name}</option>
          })
        }
      </optgroup>
    });
  };

  const buildUnitList = (units: Unit[]) => {
    const rawUnitCategories = units.flatMap(unit => unit.category);
    const unitCategories = Array.from(new Set(rawUnitCategories));
    return unitCategories.map(category => {
      return <optgroup key={'unit-category-' + category.categoryId}
        label={category.name}>
        {
          units.filter(unit => {
            return unit.category.categoryId === category.categoryId
          }).map(unit => {
            return <option value={unit.unitId}
              key={'unit-' + unit.unitId}>{unit.name} ({unit.symbol})</option>
          })
        }
      </optgroup>
    });
  };

  const onSelectIngredient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const selectedIngredient = ingredientList.find(ingredient => ingredient.ingredientId === selectedOption);
    if (selectedIngredient) {
      setIngredient(selectedIngredient)
      const units = selectedIngredient.conversions?.flatMap(conversion => conversion.fromUnit) || [];
      units.push(selectedIngredient.baseCalorie.unit);
      units.sort();
      setUnitList(units);
      setUnitData(buildUnitList(units));
    }
  }

  const onSelectUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const selectedUnit = unitList.find(unit => unit.unitId === selectedOption);
    if (selectedUnit) {
      setUnit(selectedUnit);
    }
  }

  const onSelectQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    setQuantity(selectedOption);
  }

  const addIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const selectedIngredient: SelectedIngredient = {
      ingredient,
      unit,
      serving: quantity,
      totalCalories: 0,
    };
    selectedIngredient.totalCalories = calculateCalories(selectedIngredient);
    selectIngredient(selectedIngredient);
  }

  return (
    <div className='select-ingredient'>
      <label htmlFor='ingredient'>Ingredient: </label>
      <select id='ingredient' onChange={onSelectIngredient}>
        <option value='-1'>-- Select --</option>
        {ingredientData}
      </select>
      <label htmlFor='unit'>Unit: </label>
      <select id='unit' onChange={onSelectUnit} disabled={unitData.length === 0}>
        <option value='-1'>-- Select --</option>
        {unitData}
      </select>
      <label htmlFor='quantity'>Quantity</label>
      <input id='quantity'
        type='number'
        aria-label='quantity'
        onChange={onSelectQuantity}
        className='input-quantity'
        step={0.01}
        size={5}></input>
      <button className='button-add'
        onClick={addIngredient}>Add</button>
    </div>
  );
}

export default CaloriesCalculatorInput;