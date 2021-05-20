import { useContext, useEffect, useState } from 'react';
import { Ingredient, SelectedIngredient, Unit } from '../../../services';
import { calculateCalories } from '../../../services/Calories';
import { ServiceContext } from '../../../services/Context';
import { getUniqueCategories } from '../../../utils/category';
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
  const [quantity, setQuantity] = useState(1);
  const [counter, setCounter] = useState(0);

  const { ingredientService } = useContext(ServiceContext);

  useEffect(() => {
    ingredientService.getIngredients().then(ingredients => {
      setIngredientList(ingredients);
      setIngredientData(buildIngredientList(ingredients));
    });
  }, [ingredientService]);

  const buildIngredientList = (ingredients: Ingredient[]) => {
    const ingredientCategories = getUniqueCategories(ingredients);
    return ingredientCategories.map(category => {
      return <optgroup key={'ingredient-category-' + category.categoryId}
        label={category.name}>
        {
          ingredients.filter(_ingredient => {
            return _ingredient.category.categoryId === category.categoryId
          }).map(_ingredient => {
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
      return <optgroup key={'unit-category-' + category.categoryId}
        label={category.name}>
        {
          units.filter(_unit => {
            return _unit.category.categoryId === category.categoryId
          }).map(_unit => {
            return <option value={_unit.id}
              key={'unit-' + _unit.id}>{_unit.name} ({_unit.symbol})</option>
          })
        }
      </optgroup>
    });
  };

  const onSelectIngredient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedOption = +event.target.value;
    const selectedIngredient = ingredientList.find(_ingredient => _ingredient.id === selectedOption);
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
    const selectedUnit = unitList.find(_unit => _unit.id === selectedOption);
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
      id: counter,
      ingredient,
      unit,
      serving: quantity,
      totalCalories: 0,
    };
    selectedIngredient.totalCalories = calculateCalories(selectedIngredient);
    setCounter(counter + 1);
    selectIngredient(selectedIngredient);
  }

  return (
    <div className='select-ingredient'>
      <label htmlFor='ingredient'>Ingredient*</label>
      <select id='ingredient' onChange={onSelectIngredient}>
        <option value='-1'>-- Select --</option>
        {ingredientData}
      </select>
      <label htmlFor='unit'>Unit*</label>
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
        step={0.1} size={5} value={quantity}></input>
      <button className='button-add'
        disabled={!unit.id || quantity <= 0}
        onClick={addIngredient}>Add</button>
    </div>
  );
}

export default CaloriesCalculatorInput;
