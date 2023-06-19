import { ButtonLoadMore } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { getImages } from 'services/getImages';
import { List } from './ImageGallery.styled';
import { Oval } from 'react-loader-spinner';
import ModalImage from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGallery({ request }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxPage, setmaxPage] = useState(null);
  const [checkedImage, setCheckedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!request) {
      console.log(Boolean(request));
      return;
    }

    setPage(1);
    setLoading(true);
    getImages(request)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          alert('Request not found');
        }
        setImages(data.hits);
        setPage(s => s + 1);
        setmaxPage(Math.ceil(data.totalHits / 12));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [request]);

  function loadMore() {
    setPage(s => s + 1);
    setLoading(true);
    getImages(request, page)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          throw new Error('Search not found');
        }
        setImages(s => [...s, ...data.hits]);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function closeModal(e) {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      setShowModal(false);
    }
  }

  const shouldRenderButton = images.length !== 0 && page < maxPage;
  return (
    <>
      {loading && (
        <Oval
          className="spinner"
          height={80}
          width={80}
          color="#3f51b5"
          wrapperStyle={{
            position: 'fixed',
            top: '38%',
            left: '47%',
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ffffff0"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <List>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            onClick={e => {
              setCheckedImage(e.target.dataset.modalimage);
              setShowModal(true);
            }}
            key={id}
            src={webformatURL}
            alt={tags}
            largeImage={largeImageURL}
          ></ImageGalleryItem>
        ))}
      </List>
      {shouldRenderButton && (
        <ButtonLoadMore onClick={loadMore}></ButtonLoadMore>
      )}
      {showModal && (
        <ModalImage closeModal={closeModal}>
          <img src={checkedImage} alt="large" />
        </ModalImage>
      )}
    </>
  );
}

ImageGallery.propTypes = { request: PropTypes.string.isRequired };
