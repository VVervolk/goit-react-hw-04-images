import { Image, Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, largeImage, onClick }) => {
  return (
    <Item onClick={onClick}>
      <Image src={src} alt={alt} data-modalimage={largeImage} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
