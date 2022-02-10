import styles from './burger-ingredients.module.css'
import {
    Tab,
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import PropTypes from 'prop-types';


function IngredientCard(props) {
    return (
        <div className={styles.card} onClick={() => { props.setModalState({ visible: true, content: 'ingredient', header: 'Детали ингредиента', item: props.item }) }}>
            <img src={props.item.image}></img>
            <p className={styles.itemprice}><span>{props.item.price}</span> <span className={`pl-2`}><CurrencyIcon type="primary" /></span></p>
            <p className={styles.itemname}>{props.item.name}</p>
            <Counter count={1} size="default" />
        </div>
    )
}

function BurgerIngredients(props) {

    const [current, setCurrent] = React.useState('one');

    return (
        <>
            <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredients}>
                <h2 className="pt-5 pb-6 text text_type_main-medium">Булки</h2>
                <div className={styles.ingredientswrapper}>
                    {props.data.map((item, index) => {
                        if (item.type === "bun") {
                            return (
                                <IngredientCard setModalState={props.setModalState} item={item} key={item._id} />
                            )
                        }
                    })
                    }
                </div>
                <h2 className="pt-5 pb-6 text text_type_main-medium">Соусы</h2>
                <div className={styles.ingredientswrapper}>
                    {props.data.map((item, index) => {
                        if (item.type === "sauce") {
                            return (
                                <IngredientCard setModalState={props.setModalState} item={item} key={item._id} />
                            )
                        }
                    })
                    }
                </div>
                <h2 className="pt-5 pb-6 text text_type_main-medium">Начинки</h2>
                <div className={styles.ingredientswrapper}>
                    {props.data.map((item, index) => {
                        if (item.type === "main") {
                            return (
                                <IngredientCard setModalState={props.setModalState} item={item} key={item._id} />
                            )
                        }
                    })
                    }
                </div>
            </div>
        </>
    )
}

IngredientCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired
};

BurgerIngredients.propTypes = {
    setModalState: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.number.isRequired
    })).isRequired
}

export default BurgerIngredients