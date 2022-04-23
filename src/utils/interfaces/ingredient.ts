export interface IIngredient {
    _id: string;
    id: string;
    name: string;
    type: TIngredientTypes;
    proteins?: number;
    fat?: number;
    price: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    carbohydrates?: number;
    calories?: number;
    count?: number;
  }

  export interface IUniqueIngredient extends IIngredient {
    count: number
  }
  
  export type TIngredientTypes = 'bun' | 'main' | 'sauce';