
import Modal from 'react-modal';
import css from './ImageModal.module.css'
import {Image} from "../../types/types.ts";

Modal.setAppElement('#root');

type Props = {
    imgItem: Image | null;
    isOpenModal: boolean;
    closeModal: () => void;
};

const ImageModal = ({imgItem: img, isOpenModal, closeModal}: Props) => {

    return (
        <Modal
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            className={css.Modal}
            overlayClassName={css.Overlay}
        >
            <div className={css.modalContent}>
                <div className={css.header}>
                    <span className={css.descr}>{img?.description}</span>
                    <button  className={css.btn} onClick={closeModal}>X</button>
                </div>
                <img src={img?.urls.regular} alt={img?.alt_description} title={img?.description} className={css.img}/>
            </div>
        </Modal>
    );

}

export default ImageModal