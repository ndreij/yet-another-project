import React from 'react'
import IngredientDetails from '../../components/ingredient-details/ingredient-details.js'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function IngredientsPage () {


    let match = useRouteMatch("/ingredients/:id");
    const data = useSelector(state => state.miscList.data)


    return (
        <>
            {data.length >= 0 && data.map((item) => {
                        if (item._id === match.params.id) {
                            return (
                                <IngredientDetails item={item} key={item._id}/>
                            )
                        } 
                        return null
                    })}

        </>
    )
}