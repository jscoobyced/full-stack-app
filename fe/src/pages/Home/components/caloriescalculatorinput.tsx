import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Ingredient, IngredientData, SelectedIngredient, Unit, UnitData } from '../../../services';
import { ServiceContext } from '../../../services/Context';
import './caloriescalculator.css';

type InputProps = {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void,
};

const CaloriesCalculatorInput = (props: InputProps) => {

  const { selectIngredient } = props;

  const [ingredientData, setIngredientData] = useState([] as JSX.Element[]);
  const [unitData, setUnitData] = useState([] as JSX.Element[]);
  const [ingredientList, setIngredientList] = useState([] as Ingredient[]);
  const [unitList, setUnitList] = useState([] as Unit[]);
  const [ingredient, setIngredient] = useState({} as Ingredient);
  const [unit, setUnit] = useState({} as Unit);
  const [quantity, setQuantity] = useState(0);

  const { configuration } = useContext(ServiceContext);

  const buildIngredientList = (ingredientResponse: IngredientData) => {
    const { categories, ingredients } = ingredientResponse;
    return categories.map(category => {
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

  const buildUnitList = (unitResponse: UnitData) => {
    const { categories, units } = unitResponse;
    return categories.map(category => {
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

  useEffect(() => {
    configuration.getConfiguration().then(configurationResponse => {
      const { ingredients, units } = configurationResponse;
      setIngredientList(ingredients.ingredients);
      setUnitList(units.units);
      const ingredientData = buildIngredientList(ingredients);
      const unitData = buildUnitList(units);
      setIngredientData(ingredientData);
      setUnitData(unitData);
    });
  }, [configuration]);

  const onSelectIngredient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const selectedIngredient = ingredientList.find(ingredient => ingredient.ingredientId === selectedOption);
    if (selectedIngredient) {
      setIngredient(selectedIngredient)
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
      quantity
    }
    selectIngredient(selectedIngredient);
  }

  return (
    <div className='select-ingredient'>
      <label htmlFor='ingredient'>Ingredient: </label>
      <select id='ingredient' onChange={onSelectIngredient}>
        <option value='-1'></option>
        {ingredientData}
      </select>
      <label htmlFor='quantity'>Quantity</label>
      <input id='quantity'
        type='number'
        aria-label='quantity'
        onChange={onSelectQuantity}
        className='input-quantity'
        step={0.01}
        size={5}></input>
      <label htmlFor='unit'>Unit: </label>
      <select id='unit' onChange={onSelectUnit}>
        <option value='-1'></option>
        {unitData}
      </select>
      <button className='button-add'
        onClick={addIngredient}>Add</button>
    </div>
  );
}

export default CaloriesCalculatorInput;