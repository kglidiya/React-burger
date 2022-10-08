import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'


const ConstructorItem = ({ el, index, moveListItem, deleteIngredient }) => {

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    const opacity = isDragging ? 0 : 1

    return (
        <div ref={dragDropRef} style={{ opacity }} className={constructorStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
                handleClose={deleteIngredient}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    el: ingredientType.isRequired,
    index: PropTypes.number.isRequired,
    moveListItem: PropTypes.func.isRequired,
    deleteIngredient: PropTypes.func.isRequired
};

export default ConstructorItem;