import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { REMOVE_ITEM_FROM_CART, MOVE_CARD } from '../../services/constants'
import { useSelector, useDispatch } from '../../services/hooks';
import { useRef, FC } from 'react'
import { useDrag, useDrop } from "react-dnd";
import { cartItem } from '../../utils/types'

interface draggableItemProps {
  item: cartItem, 
  index: number 
}

export const DraggableItem: FC<draggableItemProps> = ( props ) => {
  const id = props.item.uuid

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null)

  function handleClose(id: string) {
    dispatch({type: REMOVE_ITEM_FROM_CART, payload: id})
  }

const cart = useSelector((state) => state.miscList.cart)

const moveCard = (dragIndex: number, hoverIndex: number) => {

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
      const dragIndex = props.item.index ? props.item.index : 0;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
          return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      let hoverClientY = 0
      if (clientOffset !== null) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }
      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      moveCard(dragIndex, hoverIndex);
      props.item.index = hoverIndex;
  },
});

const [{opacity}, drag, preview] = useDrag({
  type: "card",
  collect: (monitor) => ({
    opacity: monitor.isDragging() ? 0 : 1}),
  item: () => {
    return { id }
  },
})

drag(drop(ref));

  return (
    <li ref={preview} className={styles.listitem} style={{ opacity}}>
      <div className={styles.drag} ref={ref}> <DragIcon type="primary" /></div>
      <div className={styles.constructorelement}>
        <ConstructorElement
          text={props.item.name}
          price={props.item.price}
          thumbnail={props.item.image}
          handleClose={() => handleClose(props.item.uuid)}
        />
      </div>
    </li>
  )
}
