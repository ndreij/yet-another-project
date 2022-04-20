import React from 'react'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from '../../services/hooks';
import { Item } from '../../utils/types'
export function IngredientsPage() {

    type MatchParams = {
        id: string;
    }

    let match = useRouteMatch<MatchParams>("/ingredients/:id");
    const data = useSelector((state) => state.miscList.data)

    return (
        <>
            {data.length >= 0 && data.map((item: Item) => {
                if (item._id === match?.params.id) {
                    return (
                        <IngredientDetails item={item} key={item._id} />
                    )
                }
                return null
            })}

        </>
    )
}