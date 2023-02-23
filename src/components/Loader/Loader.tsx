import LoaderStyles from './Loader.module.css'
import { FC } from "react";

interface ILoaderProps {
    width?: string
}

const Loader: FC<ILoaderProps> = ({ width }) => {

    return (
        <div className={LoaderStyles.container} style={{ width: width }}>
            <div className={LoaderStyles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    )
}

export default Loader