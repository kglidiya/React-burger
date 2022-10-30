import PageStyles from './NotFound404.module.css';
import image from '../../../images/notFound.png'


function NotFound404() {

    return (
        <main className={PageStyles.main}>
            <div className={PageStyles.container}>
                <h2 className={`${PageStyles.text} text text_type_main-large`}>Oops...</h2>
                <p className={`${PageStyles.text} text text_type_main-small`}>Страница не найдена</p>
                <img src={image} className={PageStyles.image} alt='Страница не найдена'></img>
            </div>
        </main>
    )
}

export default NotFound404;