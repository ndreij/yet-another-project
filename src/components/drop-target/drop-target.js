import React from 'react'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CART } from "../../services/actions";
import { v4 as uuidv4 } from 'uuid'

export const DropTarget = ( props ) => {

    const dispatch = useDispatch()
    const data = useSelector(store => store.miscList.data)

    function updateCartWithUUID(items) {
        const newItems = items.flat().map(item => {
            if (!item.uuid) {
                item = {
                    ...item, 
                    uuid: uuidv4()
                }
                return item;
            }
            return item;
        })
        dispatch({type: UPDATE_CART, payload: newItems})
    }

    const [, drop] = useDrop ({
        accept: "ingredient",
        drop(ingredient) {
            const newItem = data.filter(item => item._id === ingredient.id)
            updateCartWithUUID(newItem)
        }
    })

return (
    <div ref={drop}>
        {props.children}
    </div>
);
};