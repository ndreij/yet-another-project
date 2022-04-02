import styles from './ingredient-details.module.css'
import { FC } from 'react'
import { Item } from '../../utils/types'

interface ingredientDetailsProps {
    item: Item | null,
    key?: string
}

export const IngredientDetails: FC<ingredientDetailsProps> = (props) => {

    return ( props.item &&
        <div>
            <div className={styles.imagecontainer}>
                <img src={props.item.image_large} alt={props.item.name} />
            </div>
            <p className={styles.name}>
                {props.item.name}
            </p>
            <div className={styles.row}>
                <div className={styles.column}>

                    <p className={styles.details}>
                        Калории, ккал
                    </p>

                    <p className={styles.details}>
                        {props.item.calories}
                    </p>

                </div>

                <div className={styles.column}>

                    <p className={styles.details}>
                        Белки, г
                    </p>

                    <p className={styles.details}>
                        {props.item.proteins}
                    </p>

                </div>

                <div className={styles.column}>

                    <p className={styles.details}>
                        Жиры, г
                    </p>

                    <p className={styles.details}>
                        {props.item.fat}
                    </p>

                </div>

                <div className={styles.column}>

                    <p className={styles.details}>
                        Углеводы, г
                    </p>

                    <p className={styles.details}>
                        {props.item.carbohydrates}
                    </p>

                </div>
            </div>

        </div>
    )
}

export default IngredientDetails