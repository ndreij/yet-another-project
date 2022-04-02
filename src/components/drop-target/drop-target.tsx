import { FC } from 'React'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CART } from "../../services/actions";
import { v4 as uuidv4 } from 'uuid'
import { cartItem } from '../../utils/types'

export const DropTarget: FC = ( props ) => {

    const dispatch = useDispatch()
    const data = useSelector((store: any) => store.miscList.data)

    function updateCartWithUUID(items: Array<cartItem>) {
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
        drop(ingredient: cartItem) {
            const newItem = data.filter((item: cartItem) => item._id === ingredient.id)
            updateCartWithUUID(newItem)
        }
    })

return (
    <div ref={drop}>
        {props.children}
    </div>
);
};