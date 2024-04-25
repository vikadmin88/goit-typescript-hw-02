import css from './ImageCard.module.css'
import {Image} from "../../../types/types.ts";


type Props = {
    imgItem: Image,
    openModal: (item: Image) => void,
}

const ImageCard = ({ imgItem: { id, urls, alt_description, description }, openModal } : Props) => {
    return (
        <div className={css.imgContainer}>
            <img src={urls.small} alt={alt_description} onClick={() => openModal({ id, urls, alt_description, description } as Image)}
                title={description} className={css.img}/>
        </div>
    )
}

export default ImageCard