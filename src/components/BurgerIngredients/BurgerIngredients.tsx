import React from "react";
import { FC,  Dispatch, SetStateAction } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './BurgerIngredients.module.css';
import Ingredient from "./Ingredient/Ingredient";
import { IIngredient } from '../../utils/types'
import { useSelector } from '../../services/hooks/hooks';



interface IBurgerIngredientsProps {
    openPopup: (string: string) => void,
    setStyle: Dispatch<SetStateAction<{ boxShadow: string; }>>,
}


const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ openPopup, setStyle }) => {

    const [current, setCurrent] = React.useState('Булки');
    const refScroll = React.useRef<HTMLDivElement>(null)
    const refBunsContainer = React.useRef<HTMLDivElement>(null)
    const refSauceContainer = React.useRef<HTMLDivElement>(null)
    const refMainContainer = React.useRef<HTMLDivElement>(null)
    const ingredients = useSelector(state => state.ingredientsReducer.ingredients);

    function scrollHandler() {
        const position = refScroll.current?.scrollTop;
        const heighBuns: number | undefined = refBunsContainer.current?.clientHeight;
        const heighSauce: number | undefined = refSauceContainer.current?.clientHeight;

        if (position && heighBuns) {
            if (position > heighBuns) {
                setCurrent('Соусы')
            }
            if (position < heighBuns) {
                setCurrent('Булки')
            }
            if (heighSauce) {
                if (position > heighSauce + heighBuns) {
                    setCurrent('Начинки')
                }
            }
        }
    }

    React.useEffect(() => {
        const scrollContainer = refScroll.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', scrollHandler)
            return function () {
                scrollContainer.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [])

    function scroll(el: { current: HTMLDivElement | null }) {
        el?.current?.scrollIntoView({ block: "start", behavior: "smooth" })
    }

    return (
        <main className={burgerStyles.main} >
            <h1 className="text text_type_main-large pt-1 pr-1 pb-5 pl-1" >Соберите бургер</h1>

            <section className={burgerStyles.section}>
                <Tab value="Булки" active={current === 'Булки'} onClick={(value) => {
                    setCurrent(value)
                    scroll(refBunsContainer)
                }}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={(value) => {
                    setCurrent(value)
                    scroll(refSauceContainer)
                }}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={(value) => {
                    setCurrent(value)
                    scroll(refMainContainer)
                }}>
               Начинки
                 </Tab>
            </section>

            <div className={burgerStyles.scroll} ref={refScroll}>
                <section ref={refBunsContainer}>
                    <h2 className="text text_type_main-medium pb-2 pt-5 mb-5 mt-5"> Булки</h2>
                    <div className={burgerStyles.container} >
                        {ingredients.map((item: IIngredient) => {

                            if (item.type === 'bun') {
                                return (<Ingredient
                                    setStyle={setStyle}
                                    ingredient={item}
                                    key={item._id}
                                    openPopup={openPopup}
                                />)

                            }
                        })}
                    </div>
                </section>

                <section ref={refSauceContainer}>
                    <h2 className="text text_type_main-medium mb-5 pb-2"> Соусы</h2>
                    <div className={burgerStyles.container} >
                        {ingredients.map((item: IIngredient) => {
                            if (item.type === 'sauce') {
                                return (<Ingredient
                                    setStyle={setStyle}
                                    ingredient={item}
                                    key={item._id}
                                    openPopup={openPopup}
                                />)
                            }
                        })}
                    </div>
                </section>

                <section ref={refMainContainer}>
                    <h2 className="text text_type_main-medium pb-2 pt-5 mb-5 mt-5"> Начинки</h2>
                    <div className={burgerStyles.container} >
                        {ingredients.map((item: IIngredient) => {
                            if (item.type === 'main') {
                                return (<Ingredient
                                    setStyle={setStyle}
                                    ingredient={item}
                                    key={item._id}
                                    openPopup={openPopup}
                                />)
                            }
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}


export default BurgerIngredients;