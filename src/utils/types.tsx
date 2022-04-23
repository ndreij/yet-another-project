 export interface Item {
    _id: string,
    id?: string,
    name: string,
    price: number,
    type: string,
    image: string,
    image_large: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    bunType?: string,
    index?: number
    count?: number;
}

export interface cartItem extends Item {
  uuid: string
}

export type TModalState = {
  visible: boolean,
  header: string,
  content: string,
  item: Item | Object
}