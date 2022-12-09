import { useRef, FC } from 'react';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { IIngredient } from '../../utils/types';
import {
    deleteItem
} from "../../services/actions/constructorActions";



interface IConstructorItemProps {
    el: IIngredient,
    index: number,
    moveListItem: (dragIndex: number, hoverIndex: number) => void
    uuid: string | undefined
}

const ConstructorItem: FC<IConstructorItemProps> = ({ el, index, moveListItem, uuid }) => {
    const state = useSelector((state) => state)
    const ingrediendsConstructor = state.constructorReducer.constructor;
    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor: DragSourceMonitor<{
            index: number;
        }, unknown>) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, dropRef] = useDrop({
        accept: 'item',
        hover: (item: { index: number }, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const ref = useRef<HTMLDivElement>(null)
    const dragDropRef = dragRef(dropRef(ref)) as any
    const opacity = isDragging ? 0 : 1

    function deleteIngredient() {
        ingrediendsConstructor.map((el: IIngredient) => {
            if (uuid === el.uuid) {
                dispatch(deleteItem(uuid))
            }
        })
    }


    return (

        <div ref={dragDropRef} style={{ opacity }} className={constructorStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass={uuid}
                handleClose={deleteIngredient}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
            />
        </div>


    )
}



export default ConstructorItem;