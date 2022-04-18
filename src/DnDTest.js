import styles from './dndtest.module.css'
import React, { createContext, useEffect, useCallback } from 'react'
import { DndProvider } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from '../services/hooks';
import { UPDATE_TYPE, MOVE_INGREDIENT, SORT_COMPONENT } from "./services/actions";
import update from 'immutability-helper';


const DropTarget = ({ board }) => {

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredientList.ingredients)

    const findCard = useCallback((id) => {
        const ingredient = ingredients.filter((c) => `${c.id}` === id)[0];
        return {
            ingredient,
            index: ingredients.indexOf(ingredient),
        };
    }, [ingredients]);

    const moveCard = useCallback((id, atIndex) => {
        const { ingredient, index } = findCard(id);

        const newList = ingredients.slice();
        const spliced = update(newList, {
            $splice: [
                [index, 1],
                [atIndex, 0, newList[index]],
            ],
        })
        dispatch({
            type: SORT_COMPONENT,
            ingredients: spliced,
        });

}, [findCard, ingredients]);

const [, drop] = useDrop({
    accept: "ingredient",
    drop(itemId) {
        // Отправим экшен с текущим перетаскиваемым элементом и названием доски
        dispatch({
            type: UPDATE_TYPE,
            ...itemId,
            board
        });
    },
});

return (
    <div
        ref={drop}
        className={styles.container}
    >
        {ingredients
            // Получим массив животных, соответствующих целевому элементу
            .filter(ingredient => ingredient.board === board)
            // Отрисуем массив
            .map(ingredient => <DraggableBox key={ingredient.id} id={`${ingredient.id}`} content={ingredient} moveCard={moveCard} findCard={findCard} />)
        }
    </div>
);
};

const DraggableBox = (props) => {

    const { id, content, moveCard, findCard } = props;

    const originalIndex = findCard(id).index;

    const [{ isDrag }, drag] = useDrag({
        type: "ingredient",
        item: { id, originalIndex },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        }
    }, [id, originalIndex, moveCard]);

    const [, drop] = useDrop(() => ({
        accept: "ingredient",
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        },
    }), [findCard, moveCard]);

    return (
        !isDrag &&
        <div ref={(node) => drag(drop(node))} className={styles.divblock}>
            {content.content}
        </div>
    )
        ;
};

function DragAndDropContainer() {

    const boards = useSelector(state => state.boardList.boards)

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.body}>
                    {
                        // Отрисуем каждую доску и передадим её название в качестве пропса
                        boards.map((item, i) => (
                            <DropTarget key={i} board={item} />
                        ))
                    }
                </div>
            </DndProvider>
        </>
    );
}

export default DragAndDropContainer;
