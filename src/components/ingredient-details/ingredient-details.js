import styles from './ingredient-details.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function IngredientDetails(props) {
    console.log(props.item)
    return (
        <div>
            <img className="pt-10" src={props.item.image_large} alt={props.item.name} />
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
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }).isRequired
};

export default IngredientDetails