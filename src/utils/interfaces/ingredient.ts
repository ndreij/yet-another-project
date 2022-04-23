export interface IIngredient {
    _id: string;
    name: string;
    type: TIngredientTypes;
    proteins?: number;
    fat?: number;
    price: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    count?: number
    carbohydrates?: number;
    calories?: number;
  }

  export interface IUniqueIngredient extends IIngredient {
    count: number
  }
  
  export type TIngredientTypes = 'bun' | 'main' | 'sauce';