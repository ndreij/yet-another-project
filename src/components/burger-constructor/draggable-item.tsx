import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { REMOVE_ITEM_FROM_CART, MOVE_CARD } from '../../services/constants'
import { useSelector, useDispatch } from '../../services/hooks';
import { useRef, FC } from 'react'
import { useDrag, useDrop } from "react-dnd";
import { cartItem } from '../../utils/types'
import type { Identifier, XYCoord } from 'dnd-core';

export const ItemTypes = {
  CARD: 'card',
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface draggableItemProps {
  item: cartItem, 
  index: number 
}

export const DraggableItem: FC<draggableItemProps> = ({ item, index, ...props }) => {
  // const ref = useRef<HTMLDivElement>(null);
  const ref = useRef<any>(null)
  const id = item.id

  const dispatch = useDispatch();

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

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li ref={ref} className={styles.listitem} style={{ opacity}}>
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
