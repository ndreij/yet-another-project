import { UPDATE_TYPE, MOVE_INGREDIENT, SORT_COMPONENT, MOVE_CARD } from "../constants";


const initialState = {
    ingredients: [
        {
            id: 0,
            content: "🦒",
            board: "ingredients"
        },
        {
            id: 1,
            content: "🦔",
            board: "ingredients"
        },
        {
            id: 2,
            content: "🐻",
            board: "ingredients"
        },
        {
            id: 3,
            content: "🦁",
            board: "ingredients"
        }
    ],
    cart: []
};

export const draggableIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TYPE: {
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient =>
                    ingredient.id === action.id ? { ...ingredient, board: action.board } : ingredient
                )
            };
        }

        case SORT_COMPONENT: {
            return {
              ...state,
              ingredients: action.ingredients,
            };
          }

        default:
            return state;
    }
}