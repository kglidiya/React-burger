import PageStyles from './Orders.module.css';
import image from '../../../images/page404.png'



function Orders() {

    return (
        <main className={PageStyles.main}>
            <div className={PageStyles.container}>
                <h2 className={`${PageStyles.text} text text_type_main-large`}>Страница в разработке</h2>
                <img src={image} className={PageStyles.image} alt='Страница в разработке'></img>
            </div>
        </main>
    )
}

export default Orders;