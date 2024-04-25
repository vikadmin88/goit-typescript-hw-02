import css from './LoadMoreBtn.module.css';

type Props = {
  onLoadMoreHandler: () => void,
}

const LoadMoreBtn = ({ onLoadMoreHandler }: Props) => {
  return (
    <button type="button" className={css.button} onClick={() => onLoadMoreHandler()}>Load more</button>
  )
}

export default LoadMoreBtn