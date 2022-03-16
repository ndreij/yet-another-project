import styles from './burger-ingredients.module.css'
import {
    Tab,
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect, useRef } from 'react';
import ingredientTypes from '../../utils/types.js'
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_INGREDIENT_MODAL } from '../../services/actions'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'

function IngredientCard(props) {

    const dispatch = useDispatch();
    const cart = useSelector(store => store.miscList.cart)
    const cartItemCount = cart.filter(item => item._id === props.item._id).length

    let location = useLocation();

    const id = props.item._id

    const [, drag] = useDrag(() => ({
        type: "ingredient",
        item: { id }
    }))

    return (
        <Link
            to={{
                pathname: `/ingredients/${id}`,
                state: { background: location }
            }} >
            <div ref={drag} className={styles.card} onClick={() => { dispatch({ type: SHOW_INGREDIENT_MODAL, payload: props.item }) }}>
                <img src={props.item.image} alt={props.item.name} ></img>
                <p className={styles.itemprice}><span>{props.item.price}</span> <span className={`pl-2`}><CurrencyIcon type="primary" /></span></p>
                <p className={styles.itemname}>{props.item.name}</p>
                {cartItemCount ? <Counter count={cartItemCount} size="default" /> : null}
            </div>
        </Link>
    )
}

function BurgerIngredients() {

    const data = useSelector(state => state.miscList.data)

    const [current, setCurrent] = React.useState('one');

    const one = useRef(null);
    const two = useRef(null);
    const three = useRef(null);

    const scrollToOne = (section) => {
        one.current.scrollIntoView({ behavior: "smooth" });
        setCurrent(section);
    }

    const scrollToTwo = (section) => {
        two.current.scrollIntoView({ behavior: "smooth" });
        setCurrent(section);
    }

    const scrollToThree = (section) => {
        three.current.scrollIntoView({ behavior: "smooth" });
        setCurrent(section);
    }

    useEffect(() => {

        // Возвращаем состояние скролла в табы

        let options = {
            root: document.querySelector('#ingredientsList'),
            rootMargin: '0px',
            threshold: 0.3
        }

        let callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrent(entry.target.id);
                }
            })
        }

        let observer = new IntersectionObserver(callback, options);
        let target1 = document.querySelector('#one');
        let target2 = document.querySelector('#two');
        let target3 = document.querySelector('#three');
        observer.observe(target1);
        observer.observe(target2);
        observer.observe(target3);
    }, [])

    return (
        <>
            <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={scrollToOne}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={scrollToTwo}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={scrollToThree}>
                    Начинки
                </Tab>
            </div>
            <div id="ingredientsList" className={styles.ingredients}>
                <div id="one">
                    <h2 ref={one} className="pt-5 pb-6 text text_type_main-medium">Булки</h2>
                    <div className={styles.ingredientswrapper}>
                        {data.length >= 0 && data.map((item) => {
                            if (item.type === "bun") {
                                return (
                                    <IngredientCard item={item} key={item._id} />
                                )
                            }
                            return null
                        })
                        }
                    </div>
                </div>

                <div id="two">
                    <h2 id="two" ref={two} className="pt-5 pb-6 text text_type_main-medium">Соусы</h2>
                    <div className={styles.ingredientswrapper}>
                        {data.length && data.map((item) => {
                            if (item.type === "sauce") {
                                return (
                                    <IngredientCard item={item} key={item._id} />
                                )
                            }
                            return null
                        })
                        }
                    </div>
                </div>

                <div id="three">
                    <h2 id="three" ref={three} className="pt-5 pb-6 text text_type_main-medium">Начинки</h2>
                    <div className={styles.ingredientswrapper}>
                        {data.length > 0 && data.map((item) => {
                            if (item.type === "main") {
                                return (
                                    <IngredientCard item={item} key={item._id} />
                                )
                            }
                            return null
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

IngredientCard.propTypes = {
    item: ingredientTypes.isRequired
};


export default BurgerIngredients