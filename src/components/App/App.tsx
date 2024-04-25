
import {useState, useEffect, useRef} from "react";
import toast, { Toaster } from 'react-hot-toast';
import { requestImagesByQuery } from "../../services/api.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import './App.module.css'
import {Image, RequestBody, ResponseObject} from "../../types/types.ts";

const App = () => {
  const [imgCollection, setImgCollection] = useState<Image[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showMoreBtn, setShowMoreBtn] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const ulRef = useRef<HTMLUListElement>(null);
  const [imgItem, setImgItem] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    async function fetchDataByQuery(): Promise<void> {
      try {
        setIsLoading(true);
        setIsError(false);
        setShowMoreBtn(false);
  
        const data: ResponseObject = await requestImagesByQuery({page, query, perPage: 12} as RequestBody);
        if (data.results) {
            setImgCollection(prev => [...prev, ...data.results]);
  
          if (data.total_pages && data.total_pages > page) {
            setShowMoreBtn(true);
          } else {
            toast.success('There are no more images.');
          }
        } else {
          toast.success('No images found!');
        }
    
      } catch (err) {
        console.log(err);
        setImgCollection([]);
        setIsError(true);
        toast.error(`Network error: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchDataByQuery().then();
  }, [query, page]);


  const onSearchHandler = (searchQuery: string) => {
    if (searchQuery === query) return;
    setImgCollection([]);
    setQuery(searchQuery);
    setPage(1);
  }

  const onLoadMoreHandler = () => setPage(page + 1);

  useEffect(() => {
    if (!ulRef.current?.children[0]) return;
    const elHeight = ulRef.current.children[0].getBoundingClientRect().height;
    window.scrollBy({ left:0, top: elHeight * 3 + 45, behavior: 'smooth'});
  }, [imgCollection]);


  const openModal = (item: Image) => {
    setImgItem(item);
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setImgItem(null);
    setIsOpenModal(false);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearchHandler={onSearchHandler} />
      {isError && <ErrorMessage />}
      <ImageGallery ref={ulRef} openModal={openModal} collection={imgCollection} />
      {!isError && isLoading && <Loader />}
      {!isLoading && showMoreBtn && <LoadMoreBtn onLoadMoreHandler={onLoadMoreHandler} />}
      <ImageModal imgItem={imgItem} isOpenModal={isOpenModal} closeModal={closeModal} />
    </>
  )
}

export default App
