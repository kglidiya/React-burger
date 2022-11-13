import LoaderStyles from './Loader.module.css'

function Loader({width}) {


    return (
        <div className={LoaderStyles.container} style={{width: width}}>
            <div className={LoaderStyles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    )
}

export default Loader