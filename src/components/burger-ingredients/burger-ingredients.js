import styles from './burger-ingredients.module.css'
import { 
    Tab,
Counter,
CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function IngredientCard({item}) {
    return ( 
        <div key={item.id} className={styles.card}>
        <img src={item.image}></img>       
        <p className={styles.itemprice}><span>{item.price}</span> <span className={`pl-2`}><CurrencyIcon type="primary" /></span></p> 
        <p className="text text_type_main-default" style={{ textAlign: 'center' }}>{item.name}</p>
        <Counter count={1} size="default" />
        </div>
    )
}

function BurgerIngredients({data}) {
    
    const [current, setCurrent] = React.useState('one');
 
    return (
        <>
        <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
        <div style={{ display: 'flex' }}>
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
                {data.map((item, index) => {
                    if (item.type === "bun") {
                   return (
                    <IngredientCard item={item} />
                        )
                }})
                    } 
       </div>
      <h2 className="pt-5 pb-6 text text_type_main-medium">Соусы</h2>
      <div className={styles.ingredientswrapper}>
      {data.map((item, index) => {
                    if (item.type === "sauce") {
                   return (
                    <IngredientCard item={item} />
                        )
                }})
                    } 
        </div>
      <h2 className="pt-5 pb-6 text text_type_main-medium">Начинки</h2>
      <div className={styles.ingredientswrapper}>
      {data.map((item, index) => {
                    if (item.type === "main") {
                   return (
                    <IngredientCard item={item} />
                        )
                }})
                    } 
        </div>
        </div>
      </>
    )
}

BurgerIngredients.propTypes = {
    price: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
  }; 

export default BurgerIngredients