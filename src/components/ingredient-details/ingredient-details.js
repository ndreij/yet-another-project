import styles from './ingredient-details.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ingredientTypes from '../../utils/types.js'

function IngredientDetails(props) {

    return (
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

IngredientDetails.propTypes = {
    item: ingredientTypes.isRequired
};

export default IngredientDetails