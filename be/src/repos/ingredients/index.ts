import { Calorie, Category, Conversion, Ingredient, Unit } from '../../models/ingredients';
import { dbRows } from '../../utils/db';
import { getPool } from '../mysql';

export const getIngredients = async (): Promise<Ingredient[]> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL get_all_ingredients_with_categories_v1(true)')
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        const unitCategory = createCategory(row.UnitCategoryId, row.UnitCategoryName);
        const unit = createUnit(row.UnitId, row.UnitName, row.UnitSymbol, unitCategory);
        const calorie = createCalorie(row.CalorieId, row.CalorieServing, row.CalorieValue, unit);
        const ingredientCategory = createCategory(row.CategoryId, row.CategoryName);
        if (!!row.ConversionId) {
          const conversionUnitCategory = createCategory(row.ConversionUnitCategoryId, row.ConversionUnitCategoryName);
          const conversionUnit = createUnit(
            row.ConversionUnitId,
            row.ConversionUnitName,
            row.ConversionUnitSymbol,
            conversionUnitCategory,
          );
          const conversion = createConversion(row.ConversionId, conversionUnit, row.ConversionMultiplier);
          return createIngredient(row.IngredientId, row.IngredientName, ingredientCategory, calorie, [conversion]);
        }
        return createIngredient(row.IngredientId, row.IngredientName, ingredientCategory, calorie);
      });
    });
};

const createCategory = (id: number, name: string): Category => {
  return {
    id,
    name,
  };
};

const createUnit = (id: number, name: string, symbol: string, category: Category): Unit => {
  return {
    id,
    name,
    symbol,
    category,
  };
};

const createCalorie = (id: number, serving: number, calories: number, unit: Unit): Calorie => {
  return {
    id,
    serving,
    calories,
    unit,
  };
};

const createConversion = (id: number, fromUnit: Unit, multiplier: number): Conversion => {
  return {
    id,
    fromUnit,
    multiplier,
  };
};

const createIngredient = (
  id: number,
  name: string,
  category: Category,
  baseCalorie: Calorie,
  conversions?: Conversion[],
): Ingredient => {
  return {
    id,
    name,
    category,
    baseCalorie,
    conversions,
  };
};
