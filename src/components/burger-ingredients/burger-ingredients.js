import styles from './burger-ingredients.module.css'
import {
    Tab,
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ingredientTypes from '../../utils/types.js'
import UserContext from '../../user-context.js'

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

    const data = useContext(UserContext);

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
                    console.log(entry)
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
                    {data.data.map((item, index) => {
                        if (item.type === "bun") {
                            return (
                                <IngredientCard setModalState={props.setModalState} item={item} key={item._id} />
                            )
                        }
                    })
                    }
                </div>
                </div>

                <div id="two">
                <h2 id="two" ref={two} className="pt-5 pb-6 text text_type_main-medium">Соусы</h2>
                <div className={styles.ingredientswrapper}>
                    {data.data.map((item, index) => {
                        if (item.type === "sauce") {
                            return (
                                <IngredientCard setModalState={props.setModalState} item={item} key={item._id} />
                            )
                        }
                    })
                    }
                </div>
                </div>

                <div id="three">
                <h2 id="three" ref={three} className="pt-5 pb-6 text text_type_main-medium">Начинки</h2>
                <div className={styles.ingredientswrapper}>
                    {data.data.map((item, index) => {
                        if (item.type === "main") {
                            return (
                                <IngredientCard setModalState={props.setModalState} item={item} key={item._id} />
                            )
                        }
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

BurgerIngredients.propTypes = {
    setModalState: PropTypes.func.isRequired,
}

export default BurgerIngredients