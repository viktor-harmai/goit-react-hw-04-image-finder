import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import * as API from 'services/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import Notification from './Notification';

import { Container } from 'components/App.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetchData(query, page);
  }, [query, page]);

  const fetchData = async (query, page) => {
    try {
      setIsLoading(true);

      const response = await API.fetchData(query.toLowerCase(), page);

      if (page === 1) {
        setItems(prev => [...response]);
      } else {
        setItems(prev => [...prev, ...response]);
      }

      if (response.length === 0) {
        return toast.warn(
          'Search Failure. There is no images for your query. Please enter other query.'
        );
      }
    } catch {
      const message = 'Oops, something went wrong ...';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchbarSubmit = newQuery => {
    if (query.toLowerCase() !== newQuery.toLowerCase()) {
      setQuery(newQuery);
      setPage(1);
      setItems([]);
    } else {
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = (tags, largeImageURL) => {
    if (showModal) {
      setShowModal(!showModal);
      setTags(null);
      setLargeImageURL(null);
    } else {
      setShowModal(!showModal);
      setTags(tags);
      setLargeImageURL(largeImageURL);
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchbarSubmit} />

      {error ? (
        <Notification message={error} />
      ) : (
        <>
          {isLoading && <Loader />}
          {items.length > 0 && (
            <>
              <ImageGallery images={items} toggleModal={toggleModal} />
              <Button onClick={loadMore} />
            </>
          )}

          {showModal && (
            <Modal url={largeImageURL} alt={tags} onClose={toggleModal} />
          )}

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            theme="dark"
          />
        </>
      )}
    </Container>
  );
};
