import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './BurgerIngredients.module.css';
import Ingredient from "./Ingredient/Ingredient";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


BurgerIngredients.propTypes = {
    openPopup: PropTypes.func.isRequired,
    setStyle: PropTypes.func.isRequired
}


function BurgerIngredients({ openPopup, setStyle }) {

    const [current, setCurrent] = React.useState('one');
    const refScroll = React.useRef()
    const refBunsContainer = React.useRef()
    const refSauceContainer = React.useRef()
    const refMainContainer = React.useRef()
    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);

    function scrollHandler() {
        const position = refScroll.current.scrollTop;
        const heighBuns = refBunsContainer.current.clientHeight;
        const heighSauce = refSauceContainer.current.clientHeight;

        if (position > heighBuns) {
            setCurrent('two')
        }
        if (position > heighSauce + heighBuns) {
            setCurrent('three')
        }
        if (position < heighBuns) {
            setCurrent('one')
        }
    }


    React.useEffect(() => {
        const scrollContainer = refScroll.current;
        scrollContainer.addEventListener('scroll', scrollHandler)
        return function () {
            scrollContainer.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    function scroll(el) {
        el.current.scrollIntoView({ block: "start", behavior: "smooth" })
    }

    return (
        <main className={burgerStyles.main} >
            <h1 className="text text_type_main-large pt-1 pr-1 pb-5 pl-1" >Соберите бургер</h1>

            <section className={burgerStyles.section}>
                <Tab value="one" active={current === 'one'} onClick={() => {
                    setCurrent('one')
                    scroll(refBunsContainer)
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => {
                    setCurrent('two')
                    scroll(refSauceContainer)
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => {
                    setCurrent('three')
                    scroll(refMainContainer)
                }}>
                    Начинки
                </Tab>
            </section>

            <div className={burgerStyles.scroll} ref={refScroll}>
                <section ref={refBunsContainer}>
                    <h2 className="text text_type_main-medium pb-2 pt-5 mb-5 mt-5"> Булки</h2>
                    <div className={burgerStyles.container} >
                        {ingredients.map(item => {

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
                        {ingredients.map(item => {
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
                        {ingredients.map(item => {
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