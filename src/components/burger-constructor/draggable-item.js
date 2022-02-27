import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { REMOVE_ITEM_FROM_CART, MOVE_CARD } from '../../services/actions'
import { useSelector } from 'react-redux'
import { useRef} from 'react'
import { useDrag, useDrop } from "react-dnd";
import ingredientTypes from '../../utils/types.js'
import PropTypes from 'prop-types';

export function DraggableItem ({ item, index }) {
  const id = item.uuid

  const dispatch = useDispatch();
  const ref = useRef();

  function handleClose(id) {
    dispatch({type: REMOVE_ITEM_FROM_CART, payload: id})
  }

const cart = useSelector(state => state.miscList.cart)

const moveCard = (dragIndex, hoverIndex) => {

  const dragCard = cart[dragIndex]
  const newCards = [...cart]
  newCards.splice(dragIndex, 1)
  newCards.splice(hoverIndex, 0, dragCard)
  dispatch({type: MOVE_CARD, payload: newCards})
}

const [, drop] = useDrop({
  accept: "card",
  collect(monitor) {
      return {
          handlerId: monitor.getHandlerId(),
      };
  },
  hover(item, monitor) {
      if (!ref.current) {
          return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
          return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
  },
});

const [{opacity}, drag, preview] = useDrag({
  type: "card",
  collect: (monitor) => ({
    opacity: monitor.isDragging() ? 0 : 1}),
  item: () => {
    return { id, index }
  },
})

drag(drop(ref));

  return (
    <li ref={preview} className={styles.listitem} style={{ opacity}}>
      <div className={styles.drag} ref={ref}> <DragIcon type="primary" /></div>
      <div className={styles.constructorelement}>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleClose(item.uuid)}
        />
      </div>
    </li>
  )
}

DraggableItem.propTypes = {
  item: ingredientTypes.isRequired,
  index: PropTypes.number.isRequired,
};
