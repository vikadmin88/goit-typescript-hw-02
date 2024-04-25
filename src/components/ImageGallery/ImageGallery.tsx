import React, {forwardRef} from "react";
import ImageCard from './ImageCard/ImageCard'
import css from './ImageGallery.module.css'
import {Image} from "../../types/types.ts";

type RefParams = {
  openModal: (item: Image) => void,
  collection: Image[],
}
const ImageGallery = forwardRef(({ openModal, collection }: RefParams, ref: React.ForwardedRef<HTMLUListElement>) => {
  return (
    <ul className={css.list} ref={ref}>
      {
        collection.map((item: Image) => (
          <li key={item.id}>
            <ImageCard openModal={openModal} imgItem={item} />
          </li>
        ))
      }
    </ul>
  )
});

export default ImageGallery
