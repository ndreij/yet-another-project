import styles from './ingredient-details.module.css'
import React from 'react';
import {useSelector} from 'react-redux'

function IngredientDetails(props) {

    const item = useSelector(state => state.miscList.modalState.item)

    return (
        <div>
            <div className={styles.imagecontainer}>
                <img src={item.image_large} alt={item.name} />
            </div>
            <p className={styles.name}>
                {item.name}
            </p>
            <div className={styles.row}>
                <div className={styles.column}>

                    <p className={styles.details}>
                        Калории, ккал
                    </p>

                    <p className={styles.details}>
                        {item.calories}
                    </p>

                </div>

                <div className={styles.column}>

                    <p className={styles.details}>
                        Белки, г
                    </p>

                    <p className={styles.details}>
                        {item.proteins}
                    </p>

                </div>

                <div className={styles.column}>

                    <p className={styles.details}>
                        Жиры, г
                    </p>

                    <p className={styles.details}>
                        {item.fat}
                    </p>

                </div>

                <div className={styles.column}>

                    <p className={styles.details}>
                        Углеводы, г
                    </p>

                    <p className={styles.details}>
                        {item.carbohydrates}
                    </p>

                </div>
            </div>

        </div>
    )
}

export default IngredientDetails