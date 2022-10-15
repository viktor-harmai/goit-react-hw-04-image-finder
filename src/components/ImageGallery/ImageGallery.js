import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';
import { GalleryLst } from './ImageGallery.slyled';

const ImageGallery = ({ images, toggleModal }) => {
  return (
    <GalleryLst>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          toggleModal={() => toggleModal(tags, largeImageURL)}
        />
      ))}
    </GalleryLst>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
