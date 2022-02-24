import React from 'react'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CART } from "../../services/actions";

export const DropTarget = ( props ) => {

    const dispatch = useDispatch()
    const data = useSelector(store => store.miscList.data)

    const [, drop] = useDrop ({
        accept: "ingredient",
        drop(ingredient) {
            const newItem = data.filter(item => item._id === ingredient.id)
            dispatch({type: UPDATE_CART, payload: newItem})
        }
    })

return (
    <div ref={drop}>
        {props.children}
    </div>
);
};