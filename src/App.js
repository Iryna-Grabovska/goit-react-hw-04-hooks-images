import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
// import PropTypes from 'prop-types';
import Searchbar from 'Searchbar';
import ImageInfo from './ImageInfo';
export default function App() {
  const [query, setQuery] = useState('');

  return (
    <>
      <Searchbar onSubmit={setQuery} />
      <ImageInfo query={query} />
      <ToastContainer autoClose={3000} />
    </>
  );
}
